package com.demo.user;
import java.util.Date;

import com.alibaba.fastjson.JSONObject;
import com.demo.common.model.*;
import com.demo.credit.CreditService;
import com.jfinal.plugin.activerecord.Page;
public class UserService {
private User dao = new User().dao();
	
	public Page<User> paginate(int pageNumber, int pageSize) {
		return dao.paginate(pageNumber, pageSize, "select *", "from user order by userId asc");
	}
	
	public User findById(int id) {
		return dao.findById(id);
	}
	
	public void deleteById(int id) {
		dao.deleteById(id);
	}


	public User findUserByOpenid(String openid) {
		// TODO Auto-generated method stub
		return dao.findFirst("select * from user where wechatId=?", openid);
	}

	public User addNewUser(String openid) {
		// TODO Auto-generated method stub
        User User = new User();
        User.save();
        User.setName("userNo."+User.getUserId());
        User.setWechatId(openid);
        User.setIdentity(true);
        //设置注册时间和姓名
        Date date=new Date();
        date.getTime();
        CreditService creditService =new CreditService(User.getUserId());
        Credit credit =creditService.addNewCredit(User.getUserId());
        User.setCreditId(credit.getCreditId());
        User.setRegisterTime(date);
        User.update();
        return User;
	}
}
