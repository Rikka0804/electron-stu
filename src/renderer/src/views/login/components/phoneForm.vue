<template>
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="0"
        size="large"
    >

        <el-form-item prop="mobile">
            <el-input v-model="ruleForm.mobile" prefix-icon="iphone" clearable placeholder="请输入手机号">
                <template #prepend>+86</template>
            </el-input>
        </el-form-item>

        <el-form-item prop="captcha">
            <div class="login-msg-yzm">
                <el-input v-model="ruleForm.captcha" prefix-icon="unlock" clearable placeholder="请输入验证码"></el-input>
                <el-button :disabled="disabled" @click="getCode">获取验证码<span v-if="disabled">({{ time }})</span></el-button>
            </div>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" style="width: 100%;" round :loading='isLogin' @click="login(ruleFormRef)">登录</el-button>
        </el-form-item>

        <el-form-item>
           <router-link to="">忘记密码?</router-link>
        </el-form-item>

    </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import type { PhoneLoginData } from '@/types/login'
import { Encrypt } from '@utils/aes'
import { getLoginCaptcha, loginByMobile } from '@api/login'

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<PhoneLoginData>({
    mobile: '',
    captcha: ''
})
const validatorTel = (rule: any, value: string, callback: any) => {
    if( value === ''){
        callback( new Error('请填写手机号') );
    }else if( !/^1[3456789]\d{9}$/.test( value ) ){
        callback( new Error('请填写正确手机号') );
    }else{
        callback();
    }
}
const rules = reactive<FormRules<PhoneLoginData>>({
    mobile: [
        { validator:validatorTel,  trigger: 'blur' },
    ],
    captcha: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
    ]
})
const time = ref<number>(60);
const disabled = ref<boolean>(false);
const isLogin = ref<boolean>(false);

//获取验证码
const getCode = async ()=>{
    let validate = await ruleFormRef.value?.validateField('mobile');
    if( !validate ){
        return ElMessage.error('请填写正确的手机号');
    }

    let res = await getLoginCaptcha({
        mobile:Encrypt( ruleForm.mobile )
    })

    if(  res.code != '200') return ElMessage.error(res.msg);

    ElMessage.success('发送成功');

    disabled.value = true;
    time.value = 60;
    let timer = setInterval(()=>{
        time.value -= 1;
        if( time.value < 1 ){
            clearInterval( timer );
            disabled.value = false;
            time.value = 0;
        }
    },1000)

    return ;
}

// 登录
const login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate( (valid: boolean) => {
    if (valid) {
      return loginByMobile({
        mobile: Encrypt(ruleForm.mobile),
        captcha: Encrypt(ruleForm.captcha)

      }).then(res => {
        if (res.code !== "200") {
          ElMessage.error(res.msg)
          return Promise.reject()
        }
        return Promise.resolve()
      }).catch(() => {

        return Promise.reject()
      })

    } else {
      ElMessage.warning('请填写正确内容')
      return Promise.reject()
    }
  })
}
</script>

<style scoped>
.login-msg-yzm{
    display: flex;
    width: 100%;
}
.login-msg-yzm .el-button{
    margin-left:10px;
}
</style>
