package com.model;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import com.encoder.Md5Util;

public class Profile {

	private String firstname;
	private String lastname;
	private String username;
	private String description;
	private Avatar avatar;
	private String link;

	public Profile(String firstname, String lastname, String username) {
		this.firstname = firstname;
		this.lastname = lastname;
		this.username = username;
		this.description = "";
	}

	public void generateLink(String email, String studentId) {
		// getting current date time using calendar class
		DateFormat df = new SimpleDateFormat("dd/MM/yy HH:mm:ss");
		Calendar calobj = Calendar.getInstance();
		String date = df.format(calobj.getTime());
		this.link = Md5Util.md5(email + studentId + date);
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Avatar getAvatar() {
		return avatar;
	}

	public void removeAvatar() {
		this.avatar = null;
	}

	public void setAvatar(Avatar avatar) {
		this.avatar = avatar;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
