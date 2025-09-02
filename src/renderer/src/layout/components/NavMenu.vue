<template>
	<div v-if='nextMenu.length <= 0'>
		没有子级菜单
	</div>
	<template
		v-for='navItem in nextMenu'
		:key='navItem'
	>
		<!--二级菜单渲染-->
		<el-menu-item :index='navItem.path'>
			<el-icon>
				<component :is='navItem.meta?.icon.replace("el-icon-","") || "user" ' />
			</el-icon>
			<template #title>
				<span>{{navItem.name}}</span>
			</template>
		</el-menu-item>
	</template>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import type { Child} from '@/types/menu'
defineProps({
	nextMenu:{
		type: Object as PropType<Child[]>,
    	required: true
	}
})
</script>
