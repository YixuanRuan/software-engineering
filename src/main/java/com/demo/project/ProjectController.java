package com.demo.project;

import com.jfinal.aop.Before;
import com.jfinal.aop.Inject;
import com.jfinal.core.Controller;
import com.demo.common.model.*;

/**
 * 项目控制器
 */

public class ProjectController extends Controller {
	
	@Inject
	ProjectService service;
	
	
	public void add() {
		render("add.html");
	}
	
	/**
	 * save 与 update 的业务逻辑在实际应用中也应该放在 serivce 之中，
	 * 并要对数据进正确性进行验证，在此仅为了偷懒
	 */

	public void save() {
		getBean(Project.class,true).save();
		render("add.html");
	}
	
	public void edit() {
		setAttr("Project", service.findById(getParaToInt()));
	}
	
	/**
	 * save 与 update 的业务逻辑在实际应用中也应该放在 serivce 之中，
	 * 并要对数据进正确性进行验证，在此仅为了偷懒
	 */
	public void update() {
		Project a=getBean(Project.class);
		a.update();
	}
	
	public void delete() {
		service.deleteById(getParaToInt());
	}
}


