package corgis.supreme_court.domain;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import corgis.supreme_court.domain.MajorityAssigner;
import corgis.supreme_court.domain.MajorityWriter;

/**
 * 
 */
public class Voting {
	
    private Boolean unclear;
    private Integer minority;
    private Integer majority;
    private MajorityAssigner majorityAssigner;
    private MajorityWriter majorityWriter;
    private Boolean splitOnSecond;
    
    
    /**
     * 
     * @return Boolean
     */
    public Boolean getUnclear() {
        return this.unclear;
    }
    
    
    
    /**
     * 
     * @return Integer
     */
    public Integer getMinority() {
        return this.minority;
    }
    
    
    
    /**
     * 
     * @return Integer
     */
    public Integer getMajority() {
        return this.majority;
    }
    
    
    
    /**
     * 
     * @return MajorityAssigner
     */
    public MajorityAssigner getMajorityAssigner() {
        return this.majorityAssigner;
    }
    
    
    
    /**
     * 
     * @return MajorityWriter
     */
    public MajorityWriter getMajorityWriter() {
        return this.majorityWriter;
    }
    
    
    
    /**
     * 
     * @return Boolean
     */
    public Boolean getSplitOnSecond() {
        return this.splitOnSecond;
    }
    
    
    
	
	/**
	 * Creates a string based representation of this Voting.
	
	 * @return String
	 */
	public String toString() {
		return "Voting[" +unclear+", "+minority+", "+majority+", "+majorityAssigner+", "+majorityWriter+", "+splitOnSecond+"]";
	}
	
	/**
	 * Internal constructor to create a Voting from a  representation.
	 * @param json_data The raw json data that will be parsed.
	 */
    public Voting(JSONObject json_data) {
        //System.out.println(json_data);
        
        try {
            // unclear
            this.unclear = (Boolean)json_data.get("unclear");
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Voting; the field unclear was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Voting; the field unclear had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // minority
            this.minority = ((Number)json_data.get("minority")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Voting; the field minority was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Voting; the field minority had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // majority
            this.majority = ((Number)json_data.get("majority")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Voting; the field majority was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Voting; the field majority had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // majority assigner
            this.majorityAssigner = new MajorityAssigner((JSONObject)json_data.get("majority assigner"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Voting; the field majorityAssigner was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Voting; the field majorityAssigner had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // majority writer
            this.majorityWriter = new MajorityWriter((JSONObject)json_data.get("majority writer"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Voting; the field majorityWriter was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Voting; the field majorityWriter had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // split on second
            this.splitOnSecond = (Boolean)json_data.get("split on second");
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Voting; the field splitOnSecond was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Voting; the field splitOnSecond had the wrong structure.");
    		e.printStackTrace();
        }
        
	}	
}