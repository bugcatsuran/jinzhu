const cities = [{
	name: '北京市',
	id: 1000
},
{
	name: '深圳市',
	id: 1001
}]

Component({
  properties: {
		cities:{
			type: Array,
			value: cities
		},
		currentCity:{
			type:String,
			value:''
		},
		showCities:{
			type:Boolean,
			value:false
		},
  },

  data: {

  },

  methods: {
		hideCities:function(){
			this.triggerEvent('showCities');
		},
		chooseCity:function(e){
			const city = e.currentTarget.dataset.city;
			this.setData({
				currentCity:city
			})
			this.triggerEvent('changeCity', {city});
		}
  }
})
