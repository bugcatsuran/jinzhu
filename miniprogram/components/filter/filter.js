const school = [{
  name: '清华大学',
  value: 100
}, {
  name: '北京大学',
  value: 101
}];

const subject = [{
  name: '数学',
  value: 201
}, {
  name: '英语',
  value: 202
}, {
  name: '语文',
  value: 203
}, {
  name: '物理',
  value: 204
}, {
  name: '化学',
  value: 205
}, {
  name: '生物',
  value: 206
}, {
  name: '历史',
  value: 207
}, {
  name: '政治',
  value: 208
}, {
  name: '地理',
  value: 209
}, {
  name: '美术',
  value: 210
}, {
  name: '音乐',
  value: 211
}, {
  name: '其他',
  value: 212
}, ];

const freeTime = [{
  name: '周一',
  value: 301
}, {
  name: '周二',
  value: 302
}, {
  name: '周三',
  value: 303
}, {
  name: '周四',
  value: 304
}, {
  name: '周五',
  value: 305
}, {
  name: '周六',
  value: 306
}, {
  name: '周日',
  value: 307
}];

const fee = [{
  name: '100(元/小时)以下',
  value: 1
}, {
  name: '100~300(元/小时)',
  value: 2
}, {
  name: '300~600(元/小时)',
  value: 3
}];

const filterList = [{
  name: '学校',
  value: 'school',
  data: school,
}, {
  name: '科目',
  value: 'subject',
  data: subject,
}, {
  name: '时间',
  value: 'freeTime',
  data: freeTime,
}, 
// {
//   name: '费用',
//   value: 'fee',
//   data: fee,
// }
];

Component({
  properties: {
    filterList: {
      type: Array,
      value: filterList
    },
    items: {
      type: Array,
      value: []
    },
    showItems: {
      type: Boolean,
      value: false
    },
    filter: {
      type: String,
      value: ''
    },
		result:{
			type:Object,
			value:{
				school:'',
				subject:'',
				freeTime:'',
				fee:''
			}
		},
  },

  methods: {
    tapFilter: function(e) {
      const filter = e.currentTarget.dataset.filter.value;
      const data = e.currentTarget.dataset.filter.data;
      if (this.data.filter == filter) {
        this.setData({
          filter: '',
          showItems: false
        })
        return
      }
      this.setData({
        showItems: true,
        filter: filter,
        items: data
      })
    },

    chooseFilter: function(e) {
      const filterItem = e.currentTarget.dataset.item;
			let result = this.data.result;
			result[this.data.filter] = filterItem;
      this.setData({
				result
      })
    },

		reset:function(e){
			let result = this.data.result;
			result[this.data.filter] = '';
			this.setData({
				result
			})
		}
  }

})