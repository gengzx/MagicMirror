/* Magic Mirror Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */

var config = {
	address: "localhost", 	// Address to listen on, can be:
							// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
							// - another specific IPv4/6 to listen on a specific interface
							// - "0.0.0.0", "::" to listen on any interface
							// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/", 	// The URL path where MagicMirror is hosted. If you are using a Reverse proxy
					// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], 	// Set [] to allow all IP addresses
															// or add a specific IPv4 of 192.168.1.5 :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
															// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false, 		// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", 	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", 	// HTTPS Certificate path, only require when useHttps is true

	language: "zh-cn",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"],
	timeFormat: 24,
	units: "metric",
	// serverOnly:  true/false/"local" ,
	// local for armv6l processors, default
	//   starts serveronly and then starts chrome browser
	// false, default for all NON-armv6l devices
	// true, force serveronly mode, because you want to.. no UI on this device

	modules: [
		{
			module: "alert",
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "clock",
			position: "top_left"
		},
		{
			module: "calendar",
			header: "假期",
			position: "top_left",
			config: {
				calendars: [
					{
						symbol: "calendar-check",
						url: "webcal://p10-calendars.icloud.com/holiday/CN_zh.ics"					
					}
				]
			}
		},
		// {
		// 	module: "compliments",
		// 	position: "lower_third"
		// },
		{
			module: "currentweather",
			position: "top_right",
			config: {
				location: "北京",
				locationID: "1816670", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				appid: "0aed55705d1ab8ea6c8c51f401907cbe"
			}
		},
		{
			module: "weatherforecast",
			position: "top_right",
			header: "Weather Forecast",
			config: {
				location: "北京",
				locationID: "1816670", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				appid: "0aed55705d1ab8ea6c8c51f401907cbe"
			}
		},
		
		{
			module: "newsfeed",
			position: "bottom_bar",
			config: {
				feeds: [
					{
						title: "北京时间",
						url: "https://cn.nytimes.com/rss/"
					}
				],
				showSourceTitle: true,
				showPublishDate: true,
				broadcastNewsFeeds: true,
				broadcastNewsUpdates: true
			}
		},

		/*******第三方*******/
		// google 地图2点最佳线路
		{
            module: 'MMM-google-route',
            position: 'bottom_left',
            config: {
				refreshPeriod:0,
                key: 'AIzaSyAz1sw-HZSJLHxuFycK3t4xi8Vjrgm3M-Q',
                directionsRequest:{
                    origin: '39.946878456091746, 116.84601918520896', 	// 起始 青年社区二期
					//destination: '39.92450048568352, 116.56273854103077'
					destination: '39.97715029595599, 116.39419299870283' // 目的地 北土城
				},
				fontSize:"9px"
            }
		},
		// 从星期一到星期五的6:00 AM到8:00 AM每2分钟刷新路线
		{
			module: 'MMM-ModuleScheduler',
			config: {
				notification_schedule: [
					{ notification: 'MMM-google-route/refresh', schedule: '0/2 6-8 * * 1-5' }
				]
			}
		},
		// Sonos
		{
			module: 'MMM-Sonos',
			position: 'top_right', // you may choose any location
			config: {}
		},

		// iFrame
		{
			module: 'MMM-iFrame',
			position: 'middle_center',
			config: {
				// See 'Configuration options' for more information.
					url: ["http://192.168.3.230:8123/"],  // as many URLs you want or you can just ["ENTER IN URL"] if single URL.
					updateInterval: 5 * 60 * 1000, // rotate URLs every 30 seconds
					scrolling:"yes",
					width: "1080", // width of iframe
					height: "1900", // height of iframe
					frameWidth: "100%" // width of embedded iframe, height is beeing calculated by aspect ratio of iframe
			}
		},
		
		{
			module: "MMM-PiTemp",
			position: "top_right",
			config: {}
		},

		// 轮播导航
		{
            module: 'MMM-Carousel',
            position: 'bottom_bar', // Required only for navigation controls
            config: {
                transitionInterval: 3600000,
                showPageIndicators: true,
				showPageControls: true,
                ignoreModules: ['alert'],
                mode: 'slides',
                slides: {
                    main: ['clock', 'calendar', 'currentweather', 'newsfeed', 'MMM-google-route', 'weatherforecast', 'MMM-Sonos', 'WallberryTheme', 'MMM-PiTemp'],
                    "Slide 2": ['MMM-iFrame']
                }
            }
		},

		// 背景图片
		{
			module: "WallberryTheme",
			position: "fullscreen_below", // Required Position
			config: {
				unsplashAccessKey: "eWfMrWQe_qj8hWr3bdl7PGMl9g3_bYbsOZUM8AVbwPI", // REQUIRED
				collections: "2589108" // optional - leave empty for a random photo
			}
		},

		// iFrame
		/*
		{
			module: 'MMM-SmartWebDisplay',
			position: 'bottom_right',	// This can be any of the regions.
			config: {
				// See 'Configuration options' for more information.
				// logDebug: false, //set to true to get detailed debug logs. To see them : "Ctrl+Shift+i"
				height:"300px", //hauteur du cadre en pixel ou %
				// width:"100%", //largeur
				updateInterval: 0, //in min. Set it to 0 for no refresh (for videos)
				//NextURLInterval: 0.5, //in min, set it to 0 not to have automatic URL change. If only 1 URL given, it will be updated
				displayLastUpdate: false, //to display the last update of the URL
				displayLastUpdateFormat: 'ddd - HH:mm:ss', //format of the date and time to display
				url: ["http://192.168.3.230:8123/map"], //source of the URL to be displayed
				scrolling: "no", // allow scrolling or not. html 4 only
				shutoffDelay: 10000 //delay in miliseconds to video shut-off while using together with MMM-PIR-Sensor 
				}
		},*/

		// HomeAssistant前端模块
		/*
		{
			module: "MMM-HomeAssistant",
			position: "middle_center",
			config: {
			  host: "192.168.3.230",
			  port: 8123, // your HA port, 8123 by default.
			  accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI5NDRjZDEyNWM0YWI0NGQ5YTZmOGVhZDJhNmQyYTU0YSIsImlhdCI6MTYxMDYzNDU1MCwiZXhwIjoxOTI1OTk0NTUwfQ.cQ3CtaL8JaazROMeGsnxcM674fnb6MrZH2pt5__0qAg",
			  updateInterval: 5*1000
			}
		},
		*/

		/*
		{
            module: "MMM-WeatherChart",
            position: "top_right",
            config: {
                apiKey: "0aed55705d1ab8ea6c8c51f401907cbe",
                dataNum: 12,
                dataType: "hourly",
                height: "500px",
                width: "800px",
                lat: 35.571337,
                lon: 139.633989,
                units: "metric",
            }
		}*/
		
		/*
		// 网络连接状态
		{
			module: 'MMM-connection-status',
			header: "网络连接",
			position: 'top_left', // Or any valid MagicMirror position.
			config: {
				// See 'Configuration options' for more information.
			}
		},
		// 网络连接速度
		{
			module: 'MMM-NetworkConnection',
			position: 'top_left', // Or any valid MagicMirror position.
			config: {
				maxTime:5000,
				serverId:""
				// See 'Configuration options' for more information.
			}
		}
		
		
		{
			module: 'MMM-xiaomi',
			position: 'bottom_left',
			header: '温度 / 湿度',  //This is optional 
			config: {
				gatewayIP: '192.168.3.117',
				gatewayToken: '8586ccf1a701c157084e97dcc15a6544',
				//outsideSensorId: '158d0001618421',
				showWindow: true,
				showVentilation: true,
				showLights: false,
				audioNotifications: true,
				rooms: [{
						name: '客厅',
						sortOrder: 10,
						devices : ['158d00039268a3']
				}]
			}
		}*/


	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
