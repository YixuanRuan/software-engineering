package com.demo.user;

import com.jfinal.aop.Before;
import com.jfinal.aop.Inject;
import com.jfinal.core.Controller;
import com.jfinal.json.FastJson;
import com.jfinal.json.Jackson;
import com.jfinal.kit.HttpKit;
import com.jfinal.kit.JsonKit;
import com.demo.common.model.*;
import com.demo.credit.CreditService;

/**
 * 项目控制器
 */

public class UserController extends Controller {
	
	@Inject
	UserService service;

	
	public void add() {
		render("add.html");
	}
	
	/**
	 * save 与 update 的业务逻辑在实际应用中也应该放在 serivce 之中，
	 * 并要对数据进正确性进行验证，在此仅为了偷懒
	 */

	public void save() {
		String json=getPara("User");
		
		User User= FastJson.getJson().parse(json, User.class);
		User.set("isEmpty", true);
		System.out.println(User);
		renderJson("success");
	}
	
	public void get()
	{
		int userId=Integer.parseInt(getPara("id"));
		User user=service.findById(userId);
		CreditService creditservice=new CreditService(userId);
		Credit credit = creditservice.findByUserId(userId);
		set("User",user).set("creditScore", credit.getInt("creditScore"));
		
		renderJson();
	}
	public void edit() {
		setAttr("User", service.findById(getParaToInt()));
	}
	
	/**
	 * save 与 update 的业务逻辑在实际应用中也应该放在 serivce 之中，
	 * 并要对数据进正确性进行验证，在此仅为了偷懒
	 */
	public void update() {
		int userId=Integer.parseInt(getPara("id"));
		User user=service.findById(userId);
		String advan = getPara("advantage");
		String name = getPara("name");
		String tel = getPara("tel");
		String mail = getPara("email");
		String intro = getPara("introduction");
		
		user.setAdvantage(advan);
		user.setName(name);
		user.setPhone(tel);
		user.setMail(mail);
		user.setIntroduction(intro);
		
		// User a=getBean(User.class);
		boolean flag = user.update();
		setAttr("result",flag);
		renderJson();
	}
	
	public void delete() {
		service.deleteById(getParaToInt());
	}
}


