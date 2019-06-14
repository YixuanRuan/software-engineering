package com.demo.credit;

import com.jfinal.aop.Before;
import com.jfinal.aop.Inject;
import com.jfinal.core.Controller;
import com.jfinal.core.NotAction;
import com.jfinal.json.FastJson;
import com.jfinal.json.Jackson;
import com.jfinal.kit.HttpKit;
import com.jfinal.kit.JsonKit;
import com.demo.common.model.*;

/**
 * 项目控制器
 */

public class CreditController extends Controller {
	
	@Inject
	CreditService service;
	@NotAction
	public  User getUserJson()
	{
		String json=getPara("User");
		return FastJson.getJson().parse(json, User.class);	
	}
	void addPaise()
	{
		User user= getUserJson();
		Credit credit=service.findByUserId(user.getUserId());
		credit.setPraise(credit.getPraise()+1);
	}
	void addBad()
	{
		User user= getUserJson();
		Credit credit=service.findByUserId(user.getUserId());
		credit.setBad(credit.getBad()+1);
	}
	void addMid()
	{
		User user= getUserJson();
		Credit credit=service.findByUserId(user.getUserId());
		credit.setMid(credit.getMid()+1);
	}
	void addFailure()
	{
		User user= getUserJson();
		Credit credit=service.findByUserId(user.getUserId());
		credit.setFailure(credit.getFailure()+1);
	}
	void addSuccess()
	{
		User user= getUserJson();
		Credit credit=service.findByUserId(user.getUserId());
		credit.setSuccess(credit.getSuccess()+1);
	}
	void getCredit()
	{
		User user= getUserJson();
		Credit credit=service.findByUserId(user.getUserId());
		set("credit",credit);
		renderJson();
	}
	
}


