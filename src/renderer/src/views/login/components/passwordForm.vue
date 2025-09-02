<template>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="0" size="large">
    <el-form-item prop="username">
      <el-input v-model="ruleForm.username" prefix-icon="user" clearable placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="ruleForm.password" prefix-icon="lock" clearable placeholder="请输入密码" show-password />
    </el-form-item>
    <el-form-item>
      <div class="box-code">
        <el-input v-model="ruleForm.captcha" placeholder="请输入验证码" />
        <el-image :src="captchaUrl" class="code-img" @click="getCaptcha" />
      </div>
    </el-form-item>
    <div class="rememberMe">
      <div>
        <el-checkbox label="记住密码" />
      </div>
      <div>
        <router-link to="/reset_password">忘记密码？</router-link>
      </div>
    </div>
    <el-form-item>
      <el-button type="primary" style="width: 100%;" round @click="login(ruleFormRef)">登 录</el-button>
    </el-form-item>

  </el-form>

</template>

<script lang="ts" setup>
import { reactive, ref, onBeforeMount } from 'vue'
import { captchaImage, loginByJson} from '@api/login'
import type { FormInstance, FormRules } from 'element-plus'
import type { LoginData } from '@/types/login'
import { Encrypt } from '@utils/aes'
import { ElMessage } from 'element-plus'
// import { useUserStore,useMenuStore } from '@store'
// import { useRouter } from 'vue-router'
import useUser from '@hooks/useUser'

const captchaUrl = ref<string>('')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<LoginData>({
  username: '',
  password: '',
  key: '',
  captcha: '',

})



const rules = reactive<FormRules<LoginData>>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],

})

// 获取验证码
const getCaptcha = async () => {
  const key: string = new Date().getTime().toString()
  ruleForm.key = key
  const res = await captchaImage({ key })
  const blob = new Blob([res], { type: 'application/vnd.ms-excel;' })
  let url = URL.createObjectURL(blob)
  captchaUrl.value = url

}
onBeforeMount(() => {
  getCaptcha()


})


// const store = useUserStore()
// const menuStore = useMenuStore()
// const router = useRouter()
const login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  try {
    // 等待表单验证完成，获取验证结果
    const valid = await new Promise<boolean>((resolve) => {
      formEl!.validate((valid) => resolve(valid));
    });

    // 如果验证不通过
    if (!valid) {
      ElMessage.warning('请填写正确内容');
      return;
    }

    // 验证通过，调用登录接口
    const res = await loginByJson({
      username: Encrypt(ruleForm.username),
      password: Encrypt(ruleForm.password),
      captcha: ruleForm.captcha,
      key: ruleForm.key
    });
    if (res.code !== "200") {
      ElMessage.error(res.msg);
      return;
    }

    useUser(res.data)
    // store.setToken(res.data);

    // // 获取用户信息
    // await store.setUserData();

    // // 获取菜单列表
    // await menuStore.setMenuData();


    // router.push('/home');

  } catch (error) {
    console.error('登录过程出错:', error);
  }
};



</script>

<style scoped lang="scss">
.box-code {
  display: flex;
  align-items: center;
  width: 100%;

  .code-img {
    width: 100px;
    height: 40px;
    margin-left: 10px;
    cursor: pointer;
  }
}

.rememberMe {
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
</style>
