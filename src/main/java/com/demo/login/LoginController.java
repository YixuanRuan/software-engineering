package com.demo.login;

import java.util.Date;

import com.alibaba.fastjson.JSONObject;
import com.demo.common.model.User;
import com.demo.user.UserService;
import com.jfinal.core.Controller;
import com.jfinal.kit.HttpKit;
import com.jfinal.plugin.redis.Cache;
import com.jfinal.plugin.redis.Redis;


public class LoginController extends Controller {
	static String  AppId="wx18532faf4fd47858",AppSecret = "a33a4e55f23a04103b140e33f8b658dd";
	
	 public void auth() {
		 	UserService service=new UserService();
	        Cache bbs = Redis.use();
	        int loginid = getParaToInt("loginid", 0);
	        //根据小程序端传过来的缓存id，这个id是在java端生成的id
	        User U = bbs.get(loginid);
	        if (U == null) {
	            String grant_type = "authorization_code";
	            //URL
	            String requestUrl = "https://api.weixin.qq.com/sns/jscode2session?";
	            String code = getPara("js_code");
	            System.out.println(code);
	            //请求参数
	            String params = "appid=" + AppId + "&secret=" + AppSecret + "&js_code=" + code + "&grant_type=" + grant_type;
	            //发送请求
	            String data = HttpKit.get(requestUrl + params);
	            //解析相应内容（转换成json对象）
	            
	            JSONObject json = JSONObject.parseObject(data);
	            //用户的唯一标识（openid）
	              String Openid = String.valueOf(json.get("openid"));
	            User user = service.findUserByOpenid(Openid);
	            System.out.println(Openid);
	            if (user == null) {
					//用户信息保存在数据库中
	                User User=service.addNewUser(Openid);
	                bbs.set(User.getUserId(), User);
	                //返回userid给前端
	                setAttr("id", User.getUserId());
	            } else {
					//更新缓存
	                user.setWechatId(Openid);;
	                user.update();
//	                bbs.hset(CACHE_NAME, user.getId(), user);
	                bbs.set(user.getUserId(), user);
	                setAttr("id", user.getUserId());
	            }
	            // index();
	        } else {  
	        }
	        renderJson();
	    }
}
