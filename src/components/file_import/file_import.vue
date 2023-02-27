<template>
	<el-upload class="upload-demo" drag :auto-upload="false" :on-change="handleChange">
		<el-icon class="el-icon--upload">
			<upload-filled />
		</el-icon>
		<div class="el-upload__text">
			Drop file here or <em>click to upload</em>
		</div>
		<template #tip>
			<div class="el-upload__tip">
				Use the exported file or write json/text by yourself.
			</div>
		</template>
	</el-upload>
</template>

<script>
	import {
		UploadFilled
	} from '@element-plus/icons-vue';

	import {
		defineProps,
	} from 'vue';
	

	export default {
		components: {
			UploadFilled,
		},
		props: {
			refData: {
				required: true
			},
		},
		data(){
			return {
				fileVal: []
			}
		},
		methods: {
			handleChange(file, fileList) {
				let reader = new FileReader();
				reader.onload = (event) => {
					let jsonData = JSON.parse(event.target.result);
					if(!!jsonData)
						this.refData.val = jsonData;
				};
				reader.readAsText(file.raw);
			}
		}
	}
</script>

<style>
</style>
