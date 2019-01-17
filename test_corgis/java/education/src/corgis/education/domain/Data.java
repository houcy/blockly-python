package corgis.education.domain;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import corgis.education.domain.Enrollment;
import corgis.education.domain.Attendance;
import corgis.education.domain.Funding;
import corgis.education.domain.Score;
import corgis.education.domain.Location;

/**
 * 
 */
public class Data {
	
    private Enrollment enrollment;
    private Attendance attendance;
    private Funding funding;
    private Score score;
    private Location location;
    
    
    /**
     * 
     * @return Enrollment
     */
    public Enrollment getEnrollment() {
        return this.enrollment;
    }
    
    
    
    /**
     * 
     * @return Attendance
     */
    public Attendance getAttendance() {
        return this.attendance;
    }
    
    
    
    /**
     * 
     * @return Funding
     */
    public Funding getFunding() {
        return this.funding;
    }
    
    
    
    /**
     * 
     * @return Score
     */
    public Score getScore() {
        return this.score;
    }
    
    
    
    /**
     * 
     * @return Location
     */
    public Location getLocation() {
        return this.location;
    }
    
    
    
	
	/**
	 * Creates a string based representation of this Data.
	
	 * @return String
	 */
	public String toString() {
		return "Data[" +enrollment+", "+attendance+", "+funding+", "+score+", "+location+"]";
	}
	
	/**
	 * Internal constructor to create a Data from a  representation.
	 * @param json_data The raw json data that will be parsed.
	 */
    public Data(JSONObject json_data) {
        //System.out.println(json_data);
        
        try {
            // enrollment
            this.enrollment = new Enrollment((JSONObject)json_data.get("enrollment"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Data; the field enrollment was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Data; the field enrollment had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // attendance
            this.attendance = new Attendance((JSONObject)json_data.get("attendance"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Data; the field attendance was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Data; the field attendance had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // funding
            this.funding = new Funding((JSONObject)json_data.get("funding"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Data; the field funding was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Data; the field funding had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // score
            this.score = new Score((JSONObject)json_data.get("score"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Data; the field score was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Data; the field score had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // location
            this.location = new Location((JSONObject)json_data.get("location"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Data; the field location was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Data; the field location had the wrong structure.");
    		e.printStackTrace();
        }
        
	}	
}