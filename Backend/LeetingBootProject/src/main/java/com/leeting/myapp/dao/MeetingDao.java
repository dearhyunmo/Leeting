package com.leeting.myapp.dao;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.leeting.myapp.model.MeetingDto;
import com.leeting.myapp.model.NoticeDto;
import com.leeting.myapp.model.ParticipationDto;
import com.leeting.myapp.model.ReviewDto;

public interface MeetingDao {
	public void enrollMeeting(MeetingDto meeting) throws SQLException;
    public List<MeetingDto> listMeeting(int categoryno)  throws SQLException;
    public MeetingDto meetinginfo(int meetingno) throws SQLException;
	public void delete(int meetingno) throws SQLException;
	public void update(MeetingDto meeting) throws SQLException;
	public List<ParticipationDto> listparticipants(int meetingno);
	public ParticipationDto participationinfo(ParticipationDto participationDto);
	void setlikestatus(ParticipationDto participationDto);
	public void setmeetinglike(Map<String,Double>scoremap);
	void clickmeeting(ParticipationDto participationDto);
	public void exitmeeting(ParticipationDto participationDto);
	List<MeetingDto> searchall(String keyword);
	List<MeetingDto> searchbytitle(String keyword);
	List<MeetingDto> searchbyid(String keyword);
	List<ReviewDto> getReview(int meetingno);
    boolean postReview(ReviewDto reviewDto);
	boolean updateReview(ReviewDto reviewDto);
	boolean deleteReview(int no);
	public void enrollPhoto(Map<String, Object> meetingmap);
	public List<MeetingDto> hostMeetinglist(String hostid);
	public List<NoticeDto> meetingnoticelist(int meetingno);
	public void meetingnoticewrite(NoticeDto notice, Map<String, Object> noticemap);
	public NoticeDto noticeinfo(int meetingnoticeno);
	public void updatenotice(NoticeDto notice, Map<String, Object> noticemap);
	public void deletenotice(int noticeno);
}