var wlnup = window.wlnup = function (cfgs) {
	let obj = { asset: '//static.wlniao.com/wlniao/wlnup/', ext: '', upback: function (rlt) { } }
	obj.opt = { el: '', to: 'local', thumb: true, suffix: '', width: 60, height: 60, radius: 6, hover: 2000, border: '1px dashed #9E9E9E' }
	obj.cfg = { host: '', filter: '', bucket: '', policy: '', signature: '', path: '/upload', _filter: '.png,.jpg,.jpeg,.svg,.gif' }
	obj.set = function (cfg) {
		for (var i in cfg) {
			obj.cfg[i] = cfg[i]
		}
	}
	obj.click = function () {
		if (obj.box) {
			obj.box.click()
		}
	}
	obj.value = function () {
		let ele = document.getElementById(obj.opt.el)
		if (ele.value) {
			return ele.value.split(',').join(',')
		}
		return ''
	}
	obj.bind = function (a0, a1, a2, a3) {
		let opt = {}
		if (arguments.length >= 3 && typeof (a0) == 'string' && typeof (a1) == 'number' && typeof (a2) == 'string') {
			opt.el = a0
			opt.to = a2
			opt.width = a1
			opt.height = a1
			if (typeof (a3) == 'function') {
				opt.callback = a3;
			}
		} else if (typeof (a0) == 'object') {
			opt = a0
		}
		let o = _bindset(opt)
		let ele = document.getElementById(o.el);
		let box = document.createElement('div');
		let rmi = document.createElement('div');
		let img = document.createElement('img');
		let pro = document.createElement('div');
		function _show(url) {
			if (url) {
				if (o._filter.indexOf(obj.ext) < 0) {
					img.src = _extIcon();
				} else {
					let _u = ele.value;
					if (_u.indexOf('//') < 0) {
						_u = o.host + _u;
					}
					if (o.thumb) {
						if (o.suffix) {
							_u = _u + o.suffix;
						} else if (o.to === 'oss') {
							_u = _u + '?x-oss-process=image/resize,m_pad,w_' + o.width + ',h_' + o.height
						} else if (o.to === 'cos') {
							_u = _u + '?imageMogr2/crop/' + o.width + 'x' + o.height
						} else if (o.to === 'upyun') {
							_u = _u + '!/both/' + o.width + 'x' + o.height;
						}
					}
					img.src = _u
				}
				img.style.display = 'block'
			}
		}
		function _upback(rlt) {
			pro.style.display = 'none'
			if (rlt.success) {
				ele.value = rlt.path
				_show(rlt.url)
			}
			_tipback(rlt)
		}
		box.style.cursor = 'pointer'
		box.style.position = 'relative'
		box.style.display = 'inline-block'
		box.style.overflow = 'hidden'
		box.style.textAlign = 'center'
		box.style.boxSizing = 'border-box'
		box.style.border = o.border
		box.style.borderRadius = o.radius + 'px'
		box.style.width = o.width + 'px'
		box.style.height = o.height + 'px'
		box.style.background = '#fff url(' + obj.asset + 'wlnup.svg) center center no-repeat'
		box.style.backgroundSize = '50% 50%'
		box.onclick = function () {
			obj.progress = function (e) {
				var _temp = o.width * (e.loaded / e.total) + 1
				pro.style.width = (_temp > o.width ? o.width : _temp) + 'px'
				pro.style.display = 'block'
			}
			if (o.to === 'oss') {
				if (!o.policy) {
					_tipback({ success: false, message: 'not set policy' })
				} else if (!o.ossaccesskeyid) {
					_tipback({ success: false, message: 'not set ossaccesskeyid' })
				} else if (!o.ossdomain) {
					_tipback({ success: false, message: 'not set ossdomain' })
				} else if (!o.signature) {
					_tipback({ success: false, message: 'not set signature' })
				} else {
					obj.select(function (file) {
						obj.oss(file, _upback)
					})
				}
			} else if (o.to === 'cos') {
				if (!o.policy) {
					_tipback({ success: false, message: 'not set policy' })
				} else if (!o.secretid) {
					_tipback({ success: false, message: 'not set secretid' })
				} else if (!o.keytime) {
					_tipback({ success: false, message: 'not set keytime' })
				} else if (!o.signature) {
					_tipback({ success: false, message: 'not set signature' })
				} else {
					obj.select(function (file) {
						obj.cos(file, _upback)
					})
				}
			} else if (o.to === 'upyun') {
				_w.upyun(function (data) {
					__pro.hide();
					if (data.success) {
						__ele.val(data.path);
						if (_self._set._filter.indexOf(_self._ext) < 0) {
							__img.attr('src', _self.ext())
						} else {
							__img.attr('src', data.url + ('!/both/' + size + 'x' + size))
						}
						__rmi.show()
						if (fn) {
							fn(data)
						}
					} else if (fn) {
						fn(data)
					} else {
						alert(data.message)
					}
				});
			} else {
				if (!o.path) {
					_tipback({ success: false, message: 'not set upload path' })
				} else {
					obj.select(function (file) {
						obj.local(file, _upback)
					})
				}
			}
		}
		obj.box = box
		rmi.style.cursor = 'pointer'
		rmi.style.position = 'absolute'
		rmi.style.display = 'none'
		rmi.style.top = 0
		rmi.style.left = 0
		rmi.style.width = '100%'
		rmi.style.height = '100%'
		rmi.style.background = 'rgba(0,0,0,0.5) url(' + obj.asset + 'close.svg) center center no-repeat'
		rmi.style.backgroundSize = '30% 30%'
		rmi.onclick = function (e) {
			e.stopPropagation()
			rmi.style.display = 'none'
			img.style.display = 'none'
			ele.value = ''
		}

		img.style.cursor = 'pointer'
		img.style.display = 'none'
		img.style.width = '100%'
		img.style.height = '100%'
		img.style.border = 'none'
		img.onclick = function (e) {
			e.stopPropagation()
			setTimeout(function () {
				rmi.style.display = 'block'
			}, 100)
			setTimeout(function () {
				rmi.style.display = 'none'
			}, o.hover)
		}

		pro.style.background = '#4CAF50'
		pro.style.position = 'absolute'
		pro.style.display = 'none'
		pro.style.top = (o.height - 9) + 'px'
		pro.style.left = '0px'
		pro.style.width = '0px'
		pro.style.height = '9px'

		box.appendChild(rmi)
		box.appendChild(img)
		box.appendChild(pro)
		ele.parentNode.insertBefore(box, ele)
		if (ele.value) {
			obj.ext = ele.value.substring(ele.value.lastIndexOf('.'))
			_show(ele.value)
		}
	}
	obj.bindlist = function (a0, a1, a2, a3) {
		let opt = {}
		if (arguments.length >= 3 && typeof (a0) === 'string' && typeof (a1) === 'number' && typeof (a2) === 'string') {
			opt.el = a0
			opt.to = a2
			opt.width = a1
			opt.height = a1
			if (typeof (a3) === 'function') {
				opt.callback = a3;
			}
		} else if (typeof (a0) === 'object') {
			opt = a0
		}
		let o = _bindset(opt)
		var ele = document.getElementById(o.el)
		var lst = document.createElement('div')
		var pro = document.createElement('div')
		var add = document.createElement('div')
		function _showone(url) {
			let box = document.createElement('div')
			let rmi = document.createElement('div')
			let img = document.createElement('img')
			box.style.cursor = 'pointer'
			box.style.position = 'relative'
			box.style.display = 'inline-block'
			box.style.overflow = 'hidden'
			box.style.textAlign = 'center'
			box.style.marginRight = '5px'
			box.style.boxSizing = 'border-box'
			box.style.border = o.border
			box.style.borderRadius = o.radius + 'px'
			box.style.width = o.width + 'px'
			box.style.height = o.height + 'px'

			rmi.style.cursor = 'pointer'
			rmi.style.position = 'absolute'
			rmi.style.display = 'none'
			rmi.style.top = 0
			rmi.style.left = 0
			rmi.style.width = '100%'
			rmi.style.height = '100%'
			rmi.style.background = 'rgba(0,0,0,0.5) url(' + obj.asset + 'close.svg) center center no-repeat'
			rmi.style.backgroundSize = '30% 30%'
			rmi.setAttribute('ourl', url)
			rmi.onclick = function (e) {
				e.stopPropagation()
				let imgs = ele.value.split(',')
				let ourl = rmi.getAttribute('ourl')
				let _index = imgs.indexOf(ourl)
				imgs.splice(_index, 1);
				ele.value = imgs.join(',')
				lst.removeChild(box)
			}

			img.style.cursor = 'pointer'
			img.style.width = '100%'
			img.style.height = '100%'
			img.style.border = 'none'
			img.onclick = function (e) {
				e.stopPropagation()
				setTimeout(function () {
					rmi.style.display = 'block'
				}, 100)
				setTimeout(function () {
					rmi.style.display = 'none'
				}, o.hover)
			}

			let ext = url.substring(url.lastIndexOf('.'));
			if (o._filter.indexOf(ext) < 0) {
				img.src = _extIcon()
			} else {
				if (url.indexOf('//') < 0) {
					url = o.host + url;
				}
				if (o.thumb) {
					if (o.suffix) {
						url = url + o.suffix;
					} else if (o.to === 'oss') {
						url = url + '?x-oss-process=image/resize,m_pad,w_' + o.width + ',h_' + o.height;
					} else if (o.to === 'cos') {
						url = url + '?imageMogr2/crop/' + o.width + 'x' + o.height
					} else if (o.to === 'upyun') {
						url = url + '!/both/' + o.width + 'x' + o.height;
					}
				}
				img.src = url;
			}
			box.appendChild(rmi)
			box.appendChild(img)
			lst.insertBefore(box, add)
		}
		function _show(urls) {
			if (urls) {
				var imgs = urls.split(',').filter(o => o.length > 0)
				for (var i = 0; i < imgs.length; i++) {
					_showone(imgs[i])
				}
			}
		}
		function _upback(rlt) {
			pro.style.display = 'none'
			if (rlt.success) {
				_showone(rlt.url)
				let imgs = ele.value.split(',')
				imgs.push(rlt.path)
				ele.value = imgs.join(',')
			}
			_tipback(rlt)
		}

		lst.style.position = 'relative'
		lst.style.display = 'inline-block'
		lst.style.height = o.height + 'px'


		pro.style.background = '#4CAF50'
		pro.style.position = 'absolute'
		pro.style.display = 'none'
		pro.style.top = (o.height - 9) + 'px'
		pro.style.left = '0px'
		pro.style.width = '0px'
		pro.style.height = '9px'

		add.style.cursor = 'pointer'
		add.style.position = 'relative'
		add.style.display = 'inline-block'
		add.style.overflow = 'hidden'
		add.style.textAlign = 'center'
		add.style.boxSizing = 'border-box'
		add.style.border = o.border
		add.style.borderRadius = o.radius + 'px'
		add.style.width = o.width + 'px'
		add.style.height = o.height + 'px'
		add.style.background = '#fff url(' + obj.asset + 'wlnup.svg) center center no-repeat'
		add.style.backgroundSize = '50% 50%'
		add.onclick = function () {
			obj.progress = function (e) {
				var _temp = o.width * (e.loaded / e.total) + 1
				pro.style.width = (_temp > o.width ? o.width : _temp) + 'px'
				pro.style.display = 'block'
			}
			if (o.to === 'oss') {
				if (!o.ossdomain) {
					_tipback({ success: false, message: 'not set ossdomain' })
				} else if (!o.ossaccesskeyid) {
					_tipback({ success: false, message: 'not set ossaccesskeyid' })
				} else if (!o.policy) {
					_tipback({ success: false, message: 'not set policy' })
				} else if (!o.signature) {
					_tipback({ success: false, message: 'not set signature' })
				} else {
					obj.select(function (file) {
						obj.oss(file, _upback)
					})
				}
			} else if (o.to === 'cos') {
				if (!o.policy) {
					_tipback({ success: false, message: 'not set policy' })
				} else if (!o.secretid) {
					_tipback({ success: false, message: 'not set secretid' })
				} else if (!o.keytime) {
					_tipback({ success: false, message: 'not set keytime' })
				} else if (!o.signature) {
					_tipback({ success: false, message: 'not set signature' })
				} else {
					obj.select(function (file) {
						obj.cos(file, _upback)
					})
				}
			} else if (o.to === 'upyun') {
				_w.upyun(function (data) {
					__pro.hide();
					if (data.success) {
						__ele.val(data.path);
						if (_self._set._filter.indexOf(_self._ext) < 0) {
							__img.attr('src', _self.ext());
						} else {
							__img.attr('src', data.url + ('!/both/' + size + 'x' + size));
						}
						__rmi.show()
						if (fn) {
							fn(data)
						}
					} else if (fn) {
						fn(data)
					} else {
						alert(data.message)
					}
				});
			} else {
				if (!o.path) {
					_tipback({ success: false, message: 'not set upload path' })
				} else {
					obj.select(function (file) {
						obj.local(file, _upback)
					})
				}
			}
		}
		add.appendChild(pro)
		lst.appendChild(add)
		ele.parentNode.insertBefore(lst, ele)
		if (ele.value) {
			_show(ele.value)
		}
	}
	obj.oss = function (file, fn) {
		let rdname = ''
		let chars = 'abcdefghijklmnoparstuvwxyz0123456789'
		for (i = 0; i < 10; i++) {
			rdname += chars.charAt(Math.floor(Math.random() * chars.length))
		}
		obj.ext = file.name ? file.name.substring(file.name.lastIndexOf('.')).toLowerCase() : '.jpg'
		if (obj.cfg.filter != '.*' && obj.cfg.filter.indexOf(obj.ext) < 0) {
			_tipback({ success: false, message: 'server not accept upload ' + obj.ext });
		} else {
			let key = obj.cfg.dir + rdname + obj.ext
			let fd = new FormData()
			fd.append("key", key)
			fd.append("policy", obj.cfg.policy)
			fd.append("OSSAccessKeyId", obj.cfg.ossaccesskeyid)
			fd.append("Signature", obj.cfg.signature)
			fd.append("file", file)
			let ajax = _ajax()
			ajax.open("post", obj.cfg.ossdomain, true)
			ajax.onreadystatechange = function () {
				if (ajax.readyState == 4) {
					if (ajax.status >= 200 && ajax.status < 300) {
						fn({ success: true, message: 'success', url: obj.cfg.host + '/' + key, name, path: key[0] == '/' ? key : '/' + key, name: file.name })
					}
					else {
						var xmlDoc = new DOMParser().parseFromString(ajax.responseText, "text/xml")
						fn({ success: false, message: xmlDoc.getElementsByTagName('Message')[0].innerHTML })
					}
				}
			}
			ajax.upload.onprogress = obj.progress
			ajax.send(fd)
		}
	}
	obj.cos = function (file, fn) {
		let rdname = ''
		let chars = 'abcdefghijklmnoparstuvwxyz0123456789'
		for (i = 0; i < 10; i++) {
			rdname += chars.charAt(Math.floor(Math.random() * chars.length))
		}
		obj.ext = file.name ? file.name.substring(file.name.lastIndexOf('.')).toLowerCase() : '.jpg'
		if (obj.cfg.filter != '.*' && obj.cfg.filter.indexOf(obj.ext) < 0) {
			_tipback({ success: false, message: 'server not accept upload ' + obj.ext });
		} else {
			let key = obj.cfg.dir + rdname + obj.ext
			let fd = new FormData()
			fd.append("key", key)
			fd.append("policy", obj.cfg.policy)
			fd.append("q-sign-algorithm", 'sha1')
			fd.append("q-ak", obj.cfg.secretid)
			fd.append("q-key-time", obj.cfg.keytime)
			fd.append("q-signature", obj.cfg.signature)
			fd.append("file", file)
			let ajax = _ajax()
			ajax.open("post", obj.cfg.domain, true)
			ajax.onreadystatechange = function () {
				if (ajax.readyState == 4) {
					if (ajax.status >= 200 && ajax.status < 300) {
						fn({ success: true, message: 'success', url: obj.cfg.host + '/' + key, name, path: key[0] == '/' ? key : '/' + key, name: file.name })
					}
					else {
						var xmlDoc = new DOMParser().parseFromString(ajax.responseText, "text/xml")
						fn({ success: false, message: xmlDoc.getElementsByTagName('Message')[0].innerHTML })
					}
				}
			}
			ajax.upload.onprogress = obj.progress
			ajax.send(fd)
		}
	}
	obj.local = function (file, fn) {
		let rdname = ''
		let chars = 'abcdefghijklmnoparstuvwxyz0123456789'
		for (i = 0; i < 10; i++) {
			rdname += chars.charAt(Math.floor(Math.random() * chars.length))
		}
		obj.ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase()
		if (obj.cfg.filter != '.*' && obj.cfg.filter.indexOf(obj.ext) < 0) {
			_tipback({ success: false, message: 'server not accept upload ' + obj.ext });
		} else {
			let key = rdname + obj.ext
			let fd = new FormData()
			fd.append("key", key)
			fd.append("file", file)
			let ajax = _ajax()
			ajax.open("post", obj.cfg.path, true)
			ajax.onreadystatechange = function () {
				if (ajax.readyState == 4) {
					if (ajax.status >= 200 && ajax.status < 300) {
						fn(eval('(' + ajax.responseText + ')'))
					} else {
						fn({ success: false, message: ajax.responseText || ajax.statusText })
					}
				}
			}
			ajax.upload.onprogress = obj.progress
			ajax.send(fd)
		}
	}
	obj.select = function (fn) {   //打开资源管理器
		let _up = document.createElement('input');
		let _attType = document.createAttribute("type");
		_attType.nodeValue = "file"
		_up.setAttributeNode(_attType)
		if (obj.cfg.filter == obj.cfg._filter || !obj.cfg.filter) {
			if (!obj.cfg.filter) {
				obj.cfg.filter = obj.cfg._filter
			}
			var _attAccept = document.createAttribute("accept");
			_attAccept.nodeValue = "image/*"
			_up.setAttributeNode(_attAccept)
		}
		_up.addEventListener('change', function () {
			if (!this.files || this.files.length != 1) {
				return;
			} else {
				let _f = this.files[0]
				if (typeof (lrz) == "undefined") {
					fn(_f)
				} else {
					try {
						lrz(_f).then(function (r) {
							fn(r.file)
						}).catch(function () {
							fn(_f)
						})
					} catch (e) { fn(1 - f) }
				}
			}
		})
		_up.click()
	}
	obj.progress = function (e) { }
	function _tipback(rlt) {
		if (obj.opt.callback && typeof (obj.opt.callback) == 'function') {
			obj.opt.callback(rlt)
		} else if (!rlt.success) {
			alert(rlt.message)
		}
	}
	function _bindset(opt) {
		for (var i in opt) {
			obj.opt[i] = opt[i]
		}
		for (var i in obj.opt) {
			opt[i] = obj.opt[i]
		}
		for (var i in obj.cfg) {
			opt[i] = obj.cfg[i]
		}
		return opt
	}
	function _extIcon() {
		let extPic = obj.ext.substring(1);
		if ('zip,jpg,png,svg,pdf,mp3,mp4,avi,txt,doc,xls,ppt,iso,html,json,js,css,exe'.indexOf(extPic) < 0) {
			switch (extPic) {
				case 'docx': extPic = 'doc'; break;
				case 'xlsx': extPic = 'xls'; break;
				case 'jpeg': extPic = 'jpg'; break;
				case 'rar': extPic = 'zip'; break;
				default: extPic = 'default'; break;
			}
		}
		return obj.asset + 'ext/' + extPic + '.svg'
	}
	function _ajax() {
		var xmlHttp;
		try {
			xmlHttp = new XMLHttpRequest()
		}
		catch (e) {
			try {
				xmlHttp = new ActiveXObject("Msxml2.XMLHTTP")
			} catch (e) {
				try {
					xmlHttp = new ActiveXObject("Microsoft.XMLHTTP")
				} catch (e) {
					alert("您的浏览器不支持AJAX！")
					return false
				}
			}
		}
		return xmlHttp
	}
	obj.set(cfgs)
	return obj
}