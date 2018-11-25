// components/modal/modal.js
Component({
  /**
	 * 使用方法：
	 * <modal show="{{showModal}}" height='60%' bindcancel="modalCancel" bindconfirm='modalConfirm'>
			 <view>你自己需要展示的内容</view>
		</modal>
		属性说明：
		show： 控制modal显示与隐藏
		height：modal的高度 || 60%
		width:modal的宽度 || 80%
		bindcancel：点击取消按钮的回调函数
		bindconfirm：点击确定按钮的回调函数
	*/
	properties: {
		show: {
			type: Boolean,
			value: false
		},
		height: {
			type: String,
			value: '60%'
		},
		width: {
			type: String,
			value: '80%'
		}
	},

  /**
   * 组件的初始数据
   */
	data: {

	},

  /**
   * 组件的方法列表
   */
	methods: {
		tapMask() {
			this.setData({
				show: false
			})
		}
	}
})
