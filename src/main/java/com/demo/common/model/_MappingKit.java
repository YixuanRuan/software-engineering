package com.demo.common.model;

import com.jfinal.plugin.activerecord.ActiveRecordPlugin;

/**
 * Generated by JFinal, do not modify this file.
 * <pre>
 * Example:
 * public void configPlugin(Plugins me) {
 *     ActiveRecordPlugin arp = new ActiveRecordPlugin(...);
 *     _MappingKit.mapping(arp);
 *     me.add(arp);
 * }
 * </pre>
 */
public class _MappingKit {
	
	public static void mapping(ActiveRecordPlugin arp) {
		arp.addMapping("collection", "collectionId", Collection.class);
		arp.addMapping("credit", "creditId", Credit.class);
		arp.addMapping("joins", "joinId", Joins.class);
		arp.addMapping("judge", "judgeid", Judge.class);
		arp.addMapping("message", "messageId", Message.class);
		arp.addMapping("project", "projectId", Project.class);
		arp.addMapping("task", "taskId", Task.class);
		arp.addMapping("user", "userId", User.class);
	}
}

