package com.demo.index;

import com.jfinal.core.Controller;

public class IndexController extends Controller {
	void index()
	{
		render("index.html");
	}
}
