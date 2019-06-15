package com.demo.credit;

import com.jfinal.aop.Before;
import com.jfinal.aop.Inject;
import com.jfinal.core.Controller;
import com.jfinal.core.NotAction;
import com.jfinal.json.FastJson;
import com.jfinal.json.Jackson;
import com.jfinal.kit.HttpKit;
import com.jfinal.kit.JsonKit;
import net.sf.json.JSONArray;
import java.util.Iterator;
import com.demo.common.model.*;

/**
 * 项目控制器
 */

public class CreditController extends Controller {
	
	@Inject
	CreditService service;
	
	public  User getUserJson()
	{
		String json=getPara("User");
		return FastJson.getJson().parse(json, User.class);
	}
	public void getJudge()
	{
		String json=getRawData();
		Judge j= FastJson.getJson().parse(json, Judge.class);
		renderJson();
	}
	public void addPaise()
	{
		User user= getUserJson();
		Credit credit=service.findByUserId(user.getUserId());
		credit.setPraise(credit.getPraise()+1);
		renderJson();
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
	
	public void UpdateCredit() {
		String user = getPara("userId");
		String check = getPara("checked");
		user = user.substring(1, user.length()-1);
		check = check.substring(1, check.length()-1);
		String[] UserArr = user.split(",");
		String[] CheckArr = check.split(",");
		for(int i=0;i<UserArr.length;++i) {
			Credit credit = service.findByUserId(Integer.parseInt(UserArr[i]));
			Integer NowScore = credit.getInt("creditScore");
			if(CheckArr[i].equals("true")) {
				credit.setSuccess(credit.getInt("success") + 1);
				if(NowScore.intValue() < 100)
					credit.setCreditScore(NowScore.intValue() + 1);
			} else {
				credit.setFailure(credit.getInt("failure") + 1);
				if(NowScore.intValue() > 0)
					credit.setCreditScore(NowScore.intValue() - 1);
			}
			credit.update();
		}
		renderJson("Update Success");
	}
}









