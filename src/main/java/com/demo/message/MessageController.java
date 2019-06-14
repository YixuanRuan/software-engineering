package com.demo.message;

import com.jfinal.aop.Before;
import com.jfinal.aop.Inject;
import com.jfinal.core.Controller;
import com.jfinal.core.NotAction;
import com.jfinal.json.FastJson;
import com.jfinal.json.Jackson;
import com.jfinal.kit.HttpKit;
import com.jfinal.kit.JsonKit;

import java.util.Date;

import com.demo.common.model.*;

/**
 * 项目控制器
 */

public class MessageController extends Controller {
	
	@Inject
	MessageService service;
	@NotAction
	public  User getUserJson()
	{
		String json=getPara("User");
		return FastJson.getJson().parse(json, User.class);	
	}
	public void get()
	{
		int userId = Integer.parseInt(getPara("id"));
		// User user=getUserJson();
		// int pageNumber=10,pageSize=10;
		// setAttr("message",service.getMyMessage(pageNumber,pageSize, userId));
		setAttr("message", service.getMyMessageByList(userId));
		renderJson();
	}
	public void delete()
	{
		User user=getUserJson();
		service.delete(user.getUserId());
	}
	public void send()
	{
		String json=getPara("message");
		Message message=FastJson.getJson().parse(json, Message.class);
		Date date=new Date();
		date.getTime();
		message.setSendTime(date);
		message.setReadFlag(false);
		service.save(message);
		message.setReadFlag(false);
	}
	public void setRead()
	{
		String json=getPara("messageId");
		int id= Integer.parseInt(json);
		
		service.setRead(id);
		
		renderJson("success");
	}
	
}


