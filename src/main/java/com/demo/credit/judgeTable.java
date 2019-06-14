package com.demo.credit;

import java.io.Serializable;
public class judgeTable implements Serializable{
	int userId;
	int value;
	boolean isfinish;
	judgeTable(){};
	judgeTable(int userId,int value,boolean isfinish)
	{
		this.userId=userId;
		this.value=value;
		this.isfinish=isfinish;
	}
}
