import React from 'react';
import store from 'store';
import { getTagSearch, getLikes, getGeneralSearch, logout, getAllResults } from 'api/data';
import StarRating from 'ui/starRating';
import SearchInput from 'ui/searchInput';
import LikeBoxItem from 'ui/likeBoxItem';
import SaveSearch from 'ui/saveSearch';
import { Link, browserHistory } from 'react-router';

require('assets/styles/likesPage2.scss');
var image = require("assets/images/darkerLogo.png");
require('font-awesome-webpack');



export default React.createClass({
	getInitialState: function(){
		return {
			showSearch: false,
			showLikesSearch: false,
			showMoreButton: false,
			itemCount: 0,
			tagSearch: [],
			tagLikes: [],
			priceLikes: [],
			regionLikes: [],
			fruit:['bitter','brine', 'buttery', 'clove', 'coffee', 'corn', 'creamy', 'ginger', 'maple', 'nutmeg', 'nutty', 'salty', 'sherry', 'spices', 'tea',],
			structure: ['balanced', 'barley', 'complex', 'dry', 'earthy', 'floral', 'green', 'heavy', 'herbal', 'light', 'malty', 'mellow', 'mild', 'oak', 'old', 'peaty', 'peppery', 'rich', 'roses', 'smokey', 'smooth', 'sour', 'spicy', 'sweet', 'tobacco', 'wood'],
			region: ['island', 'rye', 'campbeltown', 'japan', 'bourbon', 'highland', 'american', 'irish', 'speyside', 'islay', 'other'],
			items: ['apple', 'banana', 'cherry', 'citrus', 'fruity', 'lemon', 'orange', 'pear', 'raisins', 'zest'],
			general: ['butterscotch', 'candy', 'chocolate', 'cinnamon', 'cocoa', 'honey', 'licorice', 'mint', 'sugar', 'toffee', 'vanilla'],
			appearance: ['amber', 'brown', 'caramel', 'pale'],
			price: ['$', '$$', '$$$'],
			proof: ['A little', 'A lot', 'Way too much'],
			likedwhiskey: [],
			startBox: true,
			likes: []
		}	
	},
	componentWillmount: function(){
		this.unsubscribe = store.subscribe(function(){
			var currentStore = store.getState();
			this.setState({
				showSearch: currentStore.showReducer.showSearch,
				tagSearch: currentStore.userReducer.tagSearch,
				itemCount: currentStore.userReducer.itemCount,
				showLikesSearch: currentStore.showReducer.showLikesSearch,
				showMoreButton: currentStore.showReducer.showMoreButton,
				likedwhiskey: currentStore.userReducer.likedwhiskey
			})
		}.bind(this))
	},
	
	getTags: function(item,index, e){
		this.startBoxStatus();
		
		var allTagLikes = this.state.tagLikes;
		
		if(allTagLikes.indexOf(item)===-1){
			allTagLikes.push(item);
		} else {
			var arrIndex = allTagLikes.indexOf(item);
			allTagLikes.splice(arrIndex,1)
		}

		this.setState({
			tagLikes: allTagLikes
		})

		this.sendAllResults();
		
	},
	getRegion: function(item, index, e){
		this.startBoxStatus();

		var allRegionLikes = this.state.regionLikes;
		
		if(allRegionLikes.indexOf(item)===-1){
			allRegionLikes.push(item);
		} else {
			var arrIndex = allRegionLikes.indexOf(item);
			allRegionLikes.splice(arrIndex,1)
		}

	
		this.setState({
			regionLikes: allRegionLikes
		})
		this.sendAllResults();
	},
	
	getPrice: function(item, index, e){
		this.startBoxStatus();

		var allPriceLikes = this.state.priceLikes;
		
		if(allPriceLikes.indexOf(item)===-1){
			allPriceLikes.push(item);
		} else {
			var arrIndex = allPriceLikes.indexOf(item);
			allPriceLikes.splice(arrIndex,1)
		}
		

		this.setState({
			priceLikes: allPriceLikes
		})
		this.sendAllResults();
	},
	sendAllResults: function(){
		var searchObj = {
			tag: this.state.tagLikes,
			price: this.state.priceLikes,
			region: this.state.regionLikes
		}
		getAllResults(searchObj);

		// store.dispatch({
		// 	type: 'GET_LIKETAGS',
		// 	tagLikes: this.state.tagLikes
		// })

		store.dispatch({
			type: 'CHANGE_SHOWSEARCH',
			showSearch: true
		})
		getLikes();	
		
		this.unsubscribe = store.subscribe(function(){
			var currentStore = store.getState();
			this.setState({
				showSearch: currentStore.showReducer.showSearch,
				tagSearch: currentStore.userReducer.tagSearch,
				itemCount: currentStore.userReducer.itemCount,
				showLikesSearch: currentStore.showReducer.showLikesSearch,
				showMoreButton: currentStore.showReducer.showMoreButton,
				likedwhiskey: currentStore.userReducer.likedwhiskey,
				likes: currentStore.whiskeyReducer.likes
			})
		}.bind(this))
	},
	startBoxStatus: function(){
		this.setState({
			startBox: false
		})
	},
	componentWillUnmount: function(){
		this.unsubscribe;
		store.dispatch({
			type: 'CHANGE_SHOWSEARCH',
			showSearch: false
		})
		store.dispatch({
			type: 'CHANGE_SHOWMOREBUTTON',
			showMoreButton: false
		})
	},
	searchFirst: function(str){
		getGeneralSearch(str);

		this.unsubscribe = store.subscribe(function(){
			var currentStore = store.getState();
			this.setState({
				showSearch: currentStore.showReducer.showSearch,
				tagSearch: currentStore.userReducer.tagSearch,
				itemCount: currentStore.userReducer.itemCount,
				showLikesSearch: currentStore.showReducer.showLikesSearch,
				showMoreButton: currentStore.showReducer.showMoreButton,
				likedwhiskey: currentStore.userReducer.likedwhiskey
			})
		}.bind(this))
		console.log('It gets here', this.state.tagSearch);
	},
	userLogout: function(){
		logout();
		browserHistory.push('/landingPage3');
	},
	onScroll: function(){
		window.onscroll = scrollFunction;
		


			function scrollFunction(){
				var scrollTest = document.getElementById('scrollTest');
				var contentHeight = scrollTest.offsetHeight;
				console.log('Content Height:', contentHeight);
				var yOffset = window.pageYOffset;
				console.log('yOffset', yOffset);
				var y = yOffset + window.innerHeight;
				console.log('This is y: yOffset + window.innerHeight', y);
				
				if(yOffset >= contentHeight){
					
					console.log("You're scrolling on the LikePage!!");
					console.log('Yippee!!');
				}		
				
		}
	},
	render: function(){
		return (
			<div className="bodyDiv"   id="scrollTest" onScroll={this.onScroll}>
			<div className="bgImage">
			
				<header className="carryLogo">
					<div className="headerFlex">
						<div className="logoDiv">
							<Link to="/landingPage3"><img src={image} /></Link>
						</div>

						<div className="headerLinks">
							<Link to="/originalContentPage">General Info</Link>
							<Link to="/userPage2">Profile</Link>
							<a href="#" onClick={this.userLogout}>Logout</a>
						</div>
					</div>
				</header>

				
				<div className="barrelBg">
					<div className="container">
					
					<div className="navheader">
						<div className="whatYouLike">Now, tell us what you like...</div>
						<div className="newSaveBox">
							{this.state.showSearch ? <SaveSearch likes={this.state.likes} /> : ""} 
						</div>
						<div className="centerSearchInput">
							<SearchInput searchFirst={this.searchFirst} startBoxStatus={this.startBoxStatus}/>
						</div>

					</div>

					<div className="pickStuff"></div>
					<div className="bigFlex">
						<div className="formContainer">
							<form className="categories" id="categories" action="" method="post" onSubmit={this.handleSubmit}>
								<div className="barrelBarFlex">
					
						
						
									<div className="tasteCategoryBox">
									<details open>
										<summary className="barrelBar topRounded">Region</summary>
										<div className="barrelPopUp bottomRounded">
											{this.state.region.map(function(item,i){
											return <div key={i}><input onClick={this.getRegion.bind(this, item, i)} type="checkbox"/>{item}</div>
											}.bind(this))}	
										</div>
									</details>
									</div>
									
									

									<div className="tasteCategoryBox">
									<details open>
										<summary className="barrelBar topRounded">Structure</summary>
										<div className="barrelPopUp bottomRounded">
											{this.state.structure.map(function(item,i){
											return <div key={i}><input onClick={this.getTags.bind(this, item, i)} type="checkbox"/>{item}</div>
											}.bind(this))}	
										</div>	
									</details>
									</div>

									<div className="tasteCategoryBox">
									<details open>
										<summary className="barrelBar topRounded">Fruit</summary>
										<div className="barrelPopUp bottomRounded">
											{this.state.items.map(function(item,i){
											return <div key={i}><input onClick={this.getTags.bind(this, item, i)} type="checkbox"/>{item}</div>
											}.bind(this))}	
										</div>	
									</details>
									</div>

									<div className="tasteCategoryBox">
									<details open>
										<summary className="barrelBar topRounded">Sweet</summary>
										<div className="barrelPopUp bottomRounded">
											{this.state.general.map(function(item,i){
											return <div key={i}><input onClick={this.getTags.bind(this, item, i)} type="checkbox"/>{item}</div>
											}.bind(this))}	
										</div>	
									</details>
									</div>

									<div className="tasteCategoryBox">
									<details open>
										<summary className="barrelBar topRounded">Notes</summary>
										<div className="barrelPopUp bottomRounded">
											{this.state.fruit.map(function(item,i){
											return <div key={i}><input onClick={this.getTags.bind(this, item, i)} type="checkbox"/>{item}</div>
											}.bind(this))}	
										</div>
									</details>
									</div>
									
									<div className="tasteCategoryBox">
									<details open>
										<summary className="barrelBar topRounded">Appearance</summary>
										<div className="barrelPopUp bottomRounded">
											{this.state.appearance.map(function(item,i){
											return <div key={i}><input onClick={this.getTags.bind(this, item, i)} type="checkbox"/>{item}</div>
											}.bind(this))}	
										</div>
									</details>
									</div>

									<div className="tasteCategoryBox">
									<details open>
										<summary className="barrelBar topRounded">Price</summary>
										<div className="barrelPopUp bottomRounded">
											{this.state.price.map(function(item,i){
											return <div key={i}><input onClick={this.getPrice.bind(this, item, i)} type="checkbox" ref="price" value={"?price=" + item} />{item}</div>
											}.bind(this))}	
										</div>
									</details>
									</div>
									{/*}
									<div className="tasteCategoryBox">
									<details open>
										<summary className="barrelBar topRounded">Proof</summary>
										<div className="barrelPopUp bottomRounded">
											{this.state.proof.map(function(item,i){
											return <div key={i}><input onClick={this.getTags.bind(this, item, i)} type="checkbox"/>{item}</div>
											}.bind(this))}	
										</div>
									</details>
									</div>
									*/}
								</div>
		
							</form>
						</div>
							
								<LikeBoxItem likedwhiskey={this.state.likedwhiskey} tagSearch={this.state.tagSearch} showMoreButton={this.state.showMoreButton} itemCount={this.state.itemCount} />

								{this.state.startBox ? <div className="startBox"><i className="fa fa-arrow-left" aria-hidden="true"></i> Start Your Search Here</div> : ""}			
						
						</div>	
					</div>
				</div>
			</div>
			</div>
		)
	}
})