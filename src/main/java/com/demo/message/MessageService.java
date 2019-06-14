package com.demo.message;

import java.util.Date;
import java.util.List;

import com.demo.common.model.*;
import com.jfinal.plugin.activerecord.Page;

public class MessageService {
	private Message dao = new Message().dao();

	public Page<Message> getMyMessage(int pageNumber,int pageSize,Integer userId) {
		// TODO Auto-generated method stub
		return dao.paginate(pageNumber, pageSize, "select *", "from message where receiveId=? order by sendTime", userId);
	}
	public List<Message> getMyMessageByList(Integer userId) {
		return dao.find("select * from message where receiveId= " + userId + " order by sendTime");
	}
	
	public void save(int receiveId,String title,String text,int type,int taskId,int sendId) {
		// TODO Auto-generated method stub
		Message message =new Message();
		if(type==1)//申请
			message.setSendId(sendId);
		else if(type==2)
			message.setSendId(sendId);
		message.setReceiveId(receiveId);
		message.setTitle(title);
		message.setText(text);
		message.setSendId(0);
		message.setReadFlag(false);
		Date date=new Date();
		date.getTime();
		message.setSendTime(date);
		message.save();
		
	}
	
	public void save(Message message) {
		// TODO Auto-generated method stub
		message.save();
	}

	public void delete(Integer userId) {
		// TODO Auto-generated method stub
		dao.deleteById(userId);
	}
	public void setRead(int id) {
		// TODO Auto-generated method stub
		dao.findById(id).setReadFlag(true);
	}
}
