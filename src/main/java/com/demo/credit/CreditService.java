package com.demo.credit;
import java.util.Date;
import java.util.List;

import com.demo.common.model.*;
import com.jfinal.plugin.activerecord.Page;
public class CreditService {
private Credit dao = new Credit().dao();
private int userId;
public CreditService(int _userId){
	userId=_userId;
}
public CreditService() {
	// TODO Auto-generated constructor stub
}
public Credit addNewCredit(int userId)
{
	Credit credit=new Credit();
	credit.setCreditId(userId);
	credit.setCreditScore(100);
	credit.setBad(0);
	credit.setFailure(0);
	credit.setSuccess(0);
	credit.setMid(0);
	credit.setPraise(0);
	credit.save();
	return credit;
}
public Credit findByUserId(int UserId)
{
	//UserId=CreditId
	return dao.findById(UserId);
}
}
