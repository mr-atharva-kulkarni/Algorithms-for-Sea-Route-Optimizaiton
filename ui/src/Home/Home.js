import React from 'react';
import './Home.css';
import bg from '../bg.jpg';
import constants from '../constants.js'
import {
		Tooltip,
		Intent,
		InputGroup,
		Button,
		Card,
		Classes,
		Elevation,
		H4,
		Alignment,
		Colors,
		Text,
		Toaster,
		Icon
		 } from "@blueprintjs/core";
import axios from 'axios';

export class Home extends React.Component{
	state = {
		register: false,
		showPassword: false,
		sloader: false,
		rloader: false,
    }

    handleLockClick = () => this.setState({ showPassword: !this.state.showPassword });
    handleRegisterClick = () => this.setState({ register: !this.state.register , showPassword: false});
    handleUserName = event => {this.setState({ username: event.target.value});}
    handlePassword  = event => {this.setState({ password: event.target.value});}
    handleEmail  = event => {this.setState({ email: event.target.value});}
    
    handleLogin = () => {
    	
    	this.setState({sloader : true});
    	let promise = axios.post(constants()['API_URL']+"/login",{'username':this.state.username,'password':this.state.password});
    	promise.then((response) => {
    		if (response.data.status){
    			Toaster.create().show({ message: "Logged in Successfully",intent:Intent.SUCCESS})
    			this.props.history.push('/apps')
    		}
    		else
    			Toaster.create().show({ message: "Incorrect Username or Password",intent:Intent.WARNING})
    		this.setState({sloader : false});
    	},err => {
    		console.log(err)
    		Toaster.create().show({ message: err.toString(),intent:Intent.DANGER})
    		this.setState({sloader : false});
    	});
    }
    
    handleRegistration = () => {
    	this.setState({rloader : true});
    	console.log('payload',{'username':this.state.username,'password':this.state.password,'email':this.state.email})
    	let promise = axios.post(constants()['API_URL']+"/register",{'username':this.state.username,'password':this.state.password,'email':this.state.email})
    	promise.then((response) => {
    		Toaster.create().show({ message: "Registered Successfully, Please Sign In to Continue",intent:Intent.SUCCESS})
    		this.handleRegisterClick()
    		this.setState({rloader : false})
    	},err => {
    		Toaster.create().show({ message: err.toString(),intent:Intent.DANGER})
    		this.setState({rloader : false})
    	})
    }

	render(){
		const { register, showPassword,sloader,rloader} = this.state;
		const lockButton = (
	            <Tooltip content={`${showPassword ? "Hide" : "Show"} Password`}>
	                <Button
	                    icon={showPassword ? "unlock" : "lock"}
	                    intent={Intent.NONE}
	                    minimal={true}
	                    onClick={this.handleLockClick}
	                />
	            </Tooltip>
	        );

		return (
		  <div className="Home" style={{"background-image": "url('"+bg+"')"}}>
		  	<div className="row">
				<div className="column-1">
					<svg className="big-logo" width="344" height="344" viewBox="0 0 344 344" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path opacity="0.8" fill-rule="evenodd" clip-rule="evenodd" d="M25 0C11.1929 0 0 11.1929 0 25V319C0 332.807 11.1929 344 25 344H319C332.807 344 344 332.807 344 319V25C344 11.1929 332.807 0 319 0H25Z" fill="white"/>
						<path fill-rule="evenodd" clip-rule="evenodd" d="M286.8 155.222C280.493 155.222 275.333 160.382 275.333 166.689C275.333 168.81 275.964 170.76 276.939 172.48L263.924 185.494C262.204 184.52 260.255 183.889 258.133 183.889C252.801 183.889 248.329 187.558 247.068 192.489H234.799C233.537 187.558 229.065 183.889 223.733 183.889C221.612 183.889 219.663 184.52 217.943 185.494L204.928 172.48C205.903 170.76 206.533 168.81 206.533 166.689C206.533 164.74 206.017 162.905 205.157 161.3L226.141 141.921C227.919 143.068 230.04 143.756 232.333 143.756C238.64 143.756 243.8 138.596 243.8 132.289C243.8 125.982 238.64 120.822 232.333 120.822C226.027 120.822 220.867 125.982 220.867 132.289C220.867 134.238 221.383 136.073 222.243 137.678L201.259 157.057C199.481 155.91 197.36 155.222 195.067 155.222C188.76 155.222 183.6 160.382 183.6 166.689C183.6 172.996 188.76 178.156 195.067 178.156C197.188 178.156 199.137 177.525 200.857 176.55L213.872 189.565C212.897 191.285 212.267 193.234 212.267 195.356C212.267 197.477 212.897 199.426 213.872 201.146L200.857 214.161C199.137 213.186 197.188 212.556 195.067 212.556C188.76 212.556 183.6 217.716 183.6 224.022C183.6 230.329 188.76 235.489 195.067 235.489C201.373 235.489 206.533 230.329 206.533 224.022C206.533 221.901 205.903 219.952 204.928 218.232L217.943 205.217C219.663 206.192 221.612 206.822 223.733 206.822C229.065 206.822 233.537 203.153 234.799 198.222H247.068C248.329 203.153 252.801 206.822 258.133 206.822C264.44 206.822 269.6 201.662 269.6 195.356C269.6 193.234 268.969 191.285 267.995 189.565L281.009 176.55C282.729 177.525 284.679 178.156 286.8 178.156C293.107 178.156 298.267 172.996 298.267 166.689C298.267 160.382 293.107 155.222 286.8 155.222Z" fill="#607980"/>
						<path d="M83.0764 75.3854C83.0764 82.9271 80.9826 88.6979 76.7951 92.6979C72.6076 96.6771 66.5764 98.6667 58.7014 98.6667H45.9201V52.9792H60.0451C67.316 52.9792 72.9722 54.9375 77.0139 58.8542C81.0556 62.7709 83.0764 68.2813 83.0764 75.3854ZM75.2014 75.6354C75.2014 64.6979 70.0868 59.2292 59.8576 59.2292H53.3889V92.3854H58.7014C69.7014 92.3854 75.2014 86.8021 75.2014 75.6354ZM86.8889 64.1042H94.8889L101.92 83.6979C102.983 86.4896 103.691 89.1146 104.045 91.5729H104.295C104.483 90.4271 104.826 89.0417 105.326 87.4167C105.826 85.7709 108.472 78 113.264 64.1042H121.201L106.42 103.26C103.733 110.448 99.2535 114.042 92.9826 114.042C91.3576 114.042 89.7743 113.865 88.2326 113.51V107.698C89.3368 107.948 90.5972 108.073 92.0139 108.073C95.5556 108.073 98.0451 106.021 99.4826 101.917L100.764 98.6667L86.8889 64.1042ZM156.858 98.6667H149.483V77.4167C149.483 74.75 148.941 72.7604 147.858 71.4479C146.795 70.1354 145.097 69.4792 142.764 69.4792C139.66 69.4792 137.389 70.3959 135.951 72.2292C134.514 74.0625 133.795 77.1354 133.795 81.4479V98.6667H126.451V64.1042H132.201L133.233 68.6354H133.608C134.649 66.9896 136.128 65.7188 138.045 64.8229C139.962 63.9271 142.087 63.4792 144.42 63.4792C152.712 63.4792 156.858 67.6979 156.858 76.1354V98.6667ZM188.701 98.6667L187.233 93.8542H186.983C185.316 95.9584 183.639 97.3959 181.951 98.1667C180.264 98.9167 178.097 99.2917 175.451 99.2917C172.056 99.2917 169.399 98.375 167.483 96.5417C165.587 94.7084 164.639 92.1146 164.639 88.7604C164.639 85.1979 165.962 82.5104 168.608 80.6979C171.253 78.8854 175.285 77.8959 180.701 77.7292L186.67 77.5417V75.6979C186.67 73.4896 186.149 71.8438 185.108 70.7604C184.087 69.6563 182.493 69.1042 180.326 69.1042C178.556 69.1042 176.858 69.3646 175.233 69.8854C173.608 70.4063 172.045 71.0209 170.545 71.7292L168.17 66.4792C170.045 65.5 172.097 64.7604 174.326 64.2604C176.556 63.7396 178.66 63.4792 180.639 63.4792C185.035 63.4792 188.347 64.4375 190.576 66.3542C192.826 68.2709 193.951 71.2813 193.951 75.3854V98.6667H188.701ZM177.764 93.6667C180.431 93.6667 182.566 92.9271 184.17 91.4479C185.795 89.9479 186.608 87.8542 186.608 85.1667V82.1667L182.17 82.3542C178.712 82.4792 176.191 83.0625 174.608 84.1042C173.045 85.125 172.264 86.6979 172.264 88.8229C172.264 90.3646 172.722 91.5625 173.639 92.4167C174.556 93.25 175.931 93.6667 177.764 93.6667ZM233.326 98.6667H225.951V77.3542C225.951 74.7084 225.451 72.7396 224.451 71.4479C223.451 70.1354 221.889 69.4792 219.764 69.4792C216.931 69.4792 214.847 70.4063 213.514 72.2604C212.201 74.0938 211.545 77.1563 211.545 81.4479V98.6667H204.201V64.1042H209.951L210.983 68.6354H211.358C212.316 66.9896 213.701 65.7188 215.514 64.8229C217.347 63.9271 219.358 63.4792 221.545 63.4792C226.858 63.4792 230.378 65.2917 232.108 68.9167H232.608C233.628 67.2084 235.066 65.875 236.92 64.9167C238.774 63.9584 240.899 63.4792 243.295 63.4792C247.42 63.4792 250.42 64.5209 252.295 66.6042C254.191 68.6875 255.139 71.8646 255.139 76.1354V98.6667H247.795V77.3542C247.795 74.7084 247.285 72.7396 246.264 71.4479C245.264 70.1354 243.701 69.4792 241.576 69.4792C238.722 69.4792 236.628 70.375 235.295 72.1667C233.983 73.9375 233.326 76.6667 233.326 80.3542V98.6667ZM272.733 98.6667H265.389V64.1042H272.733V98.6667ZM264.951 54.9479C264.951 53.6354 265.306 52.625 266.014 51.9167C266.743 51.2084 267.774 50.8542 269.108 50.8542C270.399 50.8542 271.399 51.2084 272.108 51.9167C272.837 52.625 273.201 53.6354 273.201 54.9479C273.201 56.1979 272.837 57.1875 272.108 57.9167C271.399 58.625 270.399 58.9792 269.108 58.9792C267.774 58.9792 266.743 58.625 266.014 57.9167C265.306 57.1875 264.951 56.1979 264.951 54.9479ZM297.201 99.2917C291.972 99.2917 287.993 97.7709 285.264 94.7292C282.556 91.6667 281.201 87.2813 281.201 81.5729C281.201 75.7604 282.618 71.2917 285.451 68.1667C288.306 65.0417 292.42 63.4792 297.795 63.4792C301.441 63.4792 304.722 64.1563 307.639 65.5104L305.42 71.4167C302.316 70.2084 299.753 69.6042 297.733 69.6042C291.753 69.6042 288.764 73.5729 288.764 81.5104C288.764 85.3854 289.503 88.3021 290.983 90.2604C292.483 92.1979 294.67 93.1667 297.545 93.1667C300.816 93.1667 303.91 92.3542 306.826 90.7292V97.1354C305.514 97.9063 304.108 98.4584 302.608 98.7917C301.128 99.125 299.326 99.2917 297.201 99.2917ZM72.2639 173.26C72.2639 177.323 70.7951 180.51 67.8576 182.823C64.9201 185.135 60.8681 186.292 55.7014 186.292C50.5347 186.292 46.3056 185.49 43.0139 183.885V176.823C45.0972 177.802 47.3056 178.573 49.6389 179.135C51.9931 179.698 54.1806 179.979 56.2014 179.979C59.1597 179.979 61.3368 179.417 62.7326 178.292C64.1493 177.167 64.8576 175.656 64.8576 173.76C64.8576 172.052 64.2118 170.604 62.9201 169.417C61.6285 168.229 58.9618 166.823 54.9201 165.198C50.7535 163.51 47.816 161.583 46.1076 159.417C44.3993 157.25 43.5451 154.646 43.5451 151.604C43.5451 147.792 44.8993 144.792 47.6076 142.604C50.316 140.417 53.9514 139.323 58.5139 139.323C62.8889 139.323 67.2431 140.281 71.5764 142.198L69.2014 148.292C65.1389 146.583 61.5139 145.729 58.3264 145.729C55.9097 145.729 54.0764 146.26 52.8264 147.323C51.5764 148.365 50.9514 149.75 50.9514 151.479C50.9514 152.667 51.2014 153.688 51.7014 154.542C52.2014 155.375 53.0243 156.167 54.1701 156.917C55.316 157.667 57.3785 158.656 60.3576 159.885C63.7118 161.281 66.1701 162.583 67.7326 163.792C69.2951 165 70.441 166.365 71.1701 167.885C71.8993 169.406 72.2639 171.198 72.2639 173.26ZM110.733 185.667H103.358V164.417C103.358 161.75 102.816 159.76 101.733 158.448C100.67 157.135 98.9722 156.479 96.6389 156.479C93.5556 156.479 91.2847 157.406 89.8264 159.26C88.3889 161.094 87.6701 164.177 87.6701 168.51V185.667H80.3264V137.042H87.6701V149.385C87.6701 151.365 87.5451 153.479 87.2951 155.729H87.7639C88.7639 154.063 90.1493 152.771 91.9201 151.854C93.7118 150.938 95.7951 150.479 98.1701 150.479C106.545 150.479 110.733 154.698 110.733 163.135V185.667ZM128.295 185.667H120.951V151.104H128.295V185.667ZM120.514 141.948C120.514 140.635 120.868 139.625 121.576 138.917C122.306 138.208 123.337 137.854 124.67 137.854C125.962 137.854 126.962 138.208 127.67 138.917C128.399 139.625 128.764 140.635 128.764 141.948C128.764 143.198 128.399 144.188 127.67 144.917C126.962 145.625 125.962 145.979 124.67 145.979C123.337 145.979 122.306 145.625 121.576 144.917C120.868 144.188 120.514 143.198 120.514 141.948ZM156.358 186.292C151.983 186.292 148.587 184.719 146.17 181.573H145.733C146.024 184.49 146.17 186.26 146.17 186.885V201.042H138.826V151.104H144.764C144.931 151.75 145.274 153.292 145.795 155.729H146.17C148.462 152.229 151.899 150.479 156.483 150.479C160.795 150.479 164.149 152.042 166.545 155.167C168.962 158.292 170.17 162.677 170.17 168.323C170.17 173.969 168.941 178.375 166.483 181.542C164.045 184.708 160.67 186.292 156.358 186.292ZM154.576 156.479C151.66 156.479 149.524 157.333 148.17 159.042C146.837 160.75 146.17 163.479 146.17 167.229V168.323C146.17 172.531 146.837 175.583 148.17 177.479C149.503 179.354 151.681 180.292 154.701 180.292C157.243 180.292 159.201 179.25 160.576 177.167C161.951 175.083 162.639 172.115 162.639 168.26C162.639 164.385 161.951 161.458 160.576 159.479C159.222 157.479 157.222 156.479 154.576 156.479ZM53.3889 248.229H58.5764C62.0556 248.229 64.5764 247.583 66.1389 246.292C67.7014 245 68.4826 243.083 68.4826 240.542C68.4826 237.958 67.6389 236.104 65.9514 234.979C64.2639 233.854 61.7222 233.292 58.3264 233.292H53.3889V248.229ZM53.3889 254.417V272.667H45.9201V226.979H58.8264C64.7222 226.979 69.0868 228.083 71.9201 230.292C74.7535 232.5 76.1701 235.833 76.1701 240.292C76.1701 245.979 73.2118 250.031 67.2951 252.448L80.2014 272.667H71.7014L60.7639 254.417H53.3889ZM116.733 255.323C116.733 260.969 115.285 265.375 112.389 268.542C109.493 271.708 105.462 273.292 100.295 273.292C97.066 273.292 94.2118 272.563 91.7326 271.104C89.2535 269.646 87.3472 267.552 86.0139 264.823C84.6806 262.094 84.0139 258.927 84.0139 255.323C84.0139 249.719 85.4514 245.344 88.3264 242.198C91.2014 239.052 95.2535 237.479 100.483 237.479C105.483 237.479 109.441 239.094 112.358 242.323C115.274 245.531 116.733 249.865 116.733 255.323ZM91.5764 255.323C91.5764 263.302 94.5243 267.292 100.42 267.292C106.253 267.292 109.17 263.302 109.17 255.323C109.17 247.427 106.233 243.479 100.358 243.479C97.2743 243.479 95.0347 244.5 93.6389 246.542C92.2639 248.583 91.5764 251.51 91.5764 255.323ZM149.576 272.667L148.545 268.135H148.17C147.149 269.74 145.691 271 143.795 271.917C141.92 272.833 139.774 273.292 137.358 273.292C133.17 273.292 130.045 272.25 127.983 270.167C125.92 268.083 124.889 264.927 124.889 260.698V238.104H132.295V259.417C132.295 262.063 132.837 264.052 133.92 265.385C135.003 266.698 136.701 267.354 139.014 267.354C142.097 267.354 144.358 266.438 145.795 264.604C147.253 262.75 147.983 259.656 147.983 255.323V238.104H155.358V272.667H149.576ZM178.701 267.354C180.493 267.354 182.285 267.073 184.076 266.51V272.042C183.264 272.396 182.212 272.688 180.92 272.917C179.649 273.167 178.326 273.292 176.951 273.292C169.993 273.292 166.514 269.625 166.514 262.292V243.667H161.795V240.417L166.858 237.729L169.358 230.417H173.889V238.104H183.733V243.667H173.889V262.167C173.889 263.938 174.326 265.25 175.201 266.104C176.097 266.938 177.264 267.354 178.701 267.354ZM198.358 272.667H191.014V238.104H198.358V272.667ZM190.576 228.948C190.576 227.635 190.931 226.625 191.639 225.917C192.368 225.208 193.399 224.854 194.733 224.854C196.024 224.854 197.024 225.208 197.733 225.917C198.462 226.625 198.826 227.635 198.826 228.948C198.826 230.198 198.462 231.188 197.733 231.917C197.024 232.625 196.024 232.979 194.733 232.979C193.399 232.979 192.368 232.625 191.639 231.917C190.931 231.188 190.576 230.198 190.576 228.948ZM239.295 272.667H231.92V251.417C231.92 248.75 231.378 246.76 230.295 245.448C229.233 244.135 227.535 243.479 225.201 243.479C222.097 243.479 219.826 244.396 218.389 246.229C216.951 248.063 216.233 251.135 216.233 255.448V272.667H208.889V238.104H214.639L215.67 242.635H216.045C217.087 240.99 218.566 239.719 220.483 238.823C222.399 237.927 224.524 237.479 226.858 237.479C235.149 237.479 239.295 241.698 239.295 250.135V272.667ZM278.701 238.104V242.135L272.795 243.229C273.337 243.958 273.785 244.854 274.139 245.917C274.493 246.979 274.67 248.104 274.67 249.292C274.67 252.854 273.441 255.656 270.983 257.698C268.524 259.74 265.139 260.76 260.826 260.76C259.722 260.76 258.722 260.677 257.826 260.51C256.243 261.49 255.451 262.635 255.451 263.948C255.451 264.74 255.816 265.333 256.545 265.729C257.295 266.125 258.66 266.323 260.639 266.323H266.67C270.483 266.323 273.378 267.135 275.358 268.76C277.337 270.385 278.326 272.729 278.326 275.792C278.326 279.708 276.712 282.729 273.483 284.854C270.253 286.979 265.587 288.042 259.483 288.042C254.774 288.042 251.181 287.208 248.701 285.542C246.222 283.875 244.983 281.5 244.983 278.417C244.983 276.292 245.649 274.5 246.983 273.042C248.337 271.604 250.222 270.604 252.639 270.042C251.66 269.625 250.847 268.958 250.201 268.042C249.576 267.104 249.264 266.125 249.264 265.104C249.264 263.813 249.628 262.719 250.358 261.823C251.087 260.927 252.17 260.042 253.608 259.167C251.816 258.396 250.358 257.146 249.233 255.417C248.128 253.667 247.576 251.625 247.576 249.292C247.576 245.542 248.753 242.635 251.108 240.573C253.483 238.51 256.858 237.479 261.233 237.479C262.212 237.479 263.233 237.552 264.295 237.698C265.378 237.823 266.191 237.958 266.733 238.104H278.701ZM251.545 278.042C251.545 279.625 252.253 280.844 253.67 281.698C255.108 282.552 257.118 282.979 259.701 282.979C263.701 282.979 266.681 282.406 268.639 281.26C270.597 280.115 271.576 278.594 271.576 276.698C271.576 275.198 271.035 274.125 269.951 273.479C268.889 272.854 266.899 272.542 263.983 272.542H258.42C256.316 272.542 254.639 273.031 253.389 274.01C252.16 275.01 251.545 276.354 251.545 278.042ZM254.701 249.292C254.701 251.458 255.253 253.125 256.358 254.292C257.483 255.458 259.087 256.042 261.17 256.042C265.42 256.042 267.545 253.771 267.545 249.229C267.545 246.979 267.014 245.25 265.951 244.042C264.91 242.813 263.316 242.198 261.17 242.198C259.045 242.198 257.431 242.802 256.326 244.01C255.243 245.219 254.701 246.979 254.701 249.292Z" fill="#607980"/>
					</svg>
				</div>
			 	<div className="column-2 home-form">
					 <Card classNames="slow-anim" style={{"display": register ? "none" : "block","background": "rgba(255,255,255, 0.8)","padding-top":"3em"}} elevation={Elevation.ONE}>
						 <Button alignText={Alignment.LEFT} large outlined style={{"width":"100%","background-color": Colors.BLUE2,'color':'white',"margin-bottom":"1em"}} className={Classes.BUTTON}>
						 	<span className="login-logo-btn"> <span className="login-logo fa fa-facebook"/> Sign in with Facebook </span>
						 </Button>

						 <Button alignText={Alignment.LEFT} large outlined style={{"width":"100%","background-color": Colors.RED3,'color':'white',"margin-bottom":"1em"}} className={Classes.BUTTON}>
						 	<span className="login-logo-btn"> <span className="login-logo fa fa-google"/> Sign in with Google </span>
						 </Button>
						 <div class="separator">
						 	<div class="line"><hr/></div>
						 	<div class="or">OR</div>
						 	<div class="line"><hr/></div>
						 </div>
						 <div>
							<InputGroup onChange={this.handleUserName} className="user-login-input" large id="username-input" placeholder="Username" />
							<InputGroup onChange={this.handlePassword} className="user-login-input" large id="password-input" placeholder="Password" rightElement={lockButton} type={showPassword ? "text" : "password"}/>
						 </div>
						 <div className="sign-in-flex">
						 	<div className="sign-in-col-left">
						 		<Text>New Here? <Button small outlined intent={Intent.PRIMARY} onClick={this.handleRegisterClick}>Register </Button></Text>
						 	</div>
						 	<div className="sign-in-col-right">
						 		<Button large onClick={this.handleLogin} intent={Intent.PRIMARY}>
						 			<span class={sloader ? "fa fa-spin fa-circle-o-notch" : "" }/> Sign In
						 		</Button>
						 	</div>
						 </div>
			        </Card>
			        <Card classNames="slow-anim" style={{"display": register ? "block" : "none","background":"rgba(255,255,255, 0.5)","padding-top":"3em"}} elevation={Elevation.ONE}>
			        	<div className="sign-in-flex" style={{"margin-top":"-2em"}}>
						 	<div className="sign-in-col-left">
						 		<H4>Registration Form</H4>
						 	</div>
						 	<div className="sign-in-col-right">
						 		<Button onClick={this.handleRegisterClick} intent={Intent.DANGER} icon="cross"/>
						 	</div>
						 </div>
						<InputGroup className="user-login-input" large  placeholder="Name" />
						<InputGroup onChange={this.handleUserName} className="user-login-input" large  placeholder="Username" />
						<InputGroup onChange={this.handleEmail} className="user-login-input" large  placeholder="Email" type="email" />
						<InputGroup onChange={this.handlePassword} className="user-login-input" large  placeholder="Password" rightElement={lockButton} type={showPassword ? "text" : "password"}/>
						<div className="sign-in-flex">
						 	<div className="sign-in-col-left">
						 	</div>
						 	<div className="sign-in-col-right">
						 		<Button onClick={this.handleRegistration} intent={Intent.PRIMARY}>
						 			<span class={rloader ? "fa fa-spin fa-circle-o-notch" : "" }/> Register
						 		</Button>
						 	</div>
						 </div>
			        </Card>
			 	</div>
			 </div>
		  </div>
		);
	}


};

Home.defaultProps = {};

export default Home;
