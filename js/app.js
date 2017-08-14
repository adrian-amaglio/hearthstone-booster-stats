$(function() {
	default_cards = {
  		"Commune":0,
		"Commune Doree":0,
		"Rare":0,
		"Rare Doree":0,
		"Epique":0,
		"Epique Doree":0,
		"Legendaire":0,
		"Legendaire Doree":0
  	}

	boosters = new Vue({
	  el: '#app',
	  data: {
	  	key:'guest',
	  	nb_cards_booster:5,
	  	message:{text:'', type:'danger'},
	  	cards: default_cards
	  },
	  created: function() {
	  	//todo change the key from cookie
	  },
	  methods: {
	  	add: function(id){
	  		this.cards[id]++
	  	},
	  	less: function(id){
	  		if(this.cards[id] == 0)
	  			return false
	  		this.cards[id]--
	  	},
	  	send: function(){
	  		if (this.sumup() != this.nb_cards_booster) {
	  			this.msg('danger', 'Il faut exactement '+this.nb_cards_booster+' cartes par booster')
	  			return false
	  		}
	  		$.get('', {'boosters':JSON.stringify(this.cards), 'key':this.key}, boosters.sent)
	  		console.log('Sent : '+ JSON.stringify(this.cards))
	  	},
	  	sent: function(data){
	  		if(data == 'done'){
	  			this.message.text = 'Booster envoyé'
	  			this.message.type = 'success'
	  			for (i in this.cards) {
	  				this.cards[i] = 0
	  			}
	  		}else{
	  			this.msg('danger', 'Erreur d’envoi du booster')
	  			console.log('error sening booster : '+data)
	  		}
	  		// Todo save key in cookies
	  	},
	  	msg: function(type, message){
	  		this.message.type = type
	  		this.message.text = message
	  		window.setTimeout(this.clearmessage, 5000)
		},
	  	clearmessage: function(){
	  		this.message.text = ''
  			this.message.type = 'danger'
	  	},
	  	sumup: function(){
	  		s=0
	  		for (c in this.cards) {
	  			s += this.cards[c]
	  		}
	  		return s
	  	}
	  }
	})

	stats = new Vue({
		el: '#stats',
	  	data: {
	  		db: []
	  	},
	  	created: function(){
	  		$.get('', {action:'pull'}, this.pull)
	  	},
	  	methods: {
	  		pull: function(data){
	  			this.db = data
	  			this.get_users()
	  			this.make_stats()
	  			this.make_total()
	  		},
	  		get_users: function(){
	  			for (entry in this.db){
	  				if(this.stats[entry.user]){
	  					continue
	  				}
	  				console.log('new user '+entry.user)
	  				this.stats[entry.user] = default_cards
	  				this.stats[entry.user]
	  			}
	  		},
	  		make_stats: function(){
	  			for (entry in this.db) {
	  				for(card in entry.booster){
	  					this.stats[entry.user][card] += entry.booster[card]
	  				}
	  			}
	  		},
	  		make_total: function(){
	  			this.all = default_cards
	  			for(player in this.stats){
	  				
	  			}
	  		}
	  	}
	})
})

function g(tab, id, deflt){
	for (var i = tab.length-1; i >= 0; i--) {
		if(tab[i].id==id){
			return copy(tab.slice(i, i+1)[0])
		}
	}
	console.log('The entry '+id+' was not found in '+JSON.stringify(tab))
	return deflt
}