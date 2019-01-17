package corgis.business_dynamics.domain;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import corgis.business_dynamics.domain.JobDestruction;
import corgis.business_dynamics.domain.JobCreation;
import corgis.business_dynamics.domain.Calculated;
import corgis.business_dynamics.domain.FirmExits;
import corgis.business_dynamics.domain.Establishments;

/**
 * 
 */
public class Data {
	
    private JobDestruction jobDestruction;
    // The number of firms in this state during this year.
    private Integer numberOfFirms;
    private JobCreation jobCreation;
    private Calculated calculated;
    private FirmExits firmExits;
    private Establishments establishments;
    // The Davis-Haltiwanger-Schuh (DHS) denominator is the two-period trailing moving average of employment, intended to prevent transitory shocks from distorting net growth. In other words, this value roughly represents the employment for the area, but is resistant to sudden, spiking growth.
    private Integer dhsDenominator;
    
    
    /**
     * 
     * @return JobDestruction
     */
    public JobDestruction getJobDestruction() {
        return this.jobDestruction;
    }
    
    
    
    /**
     * The number of firms in this state during this year.
     * @return Integer
     */
    public Integer getNumberOfFirms() {
        return this.numberOfFirms;
    }
    
    
    
    /**
     * 
     * @return JobCreation
     */
    public JobCreation getJobCreation() {
        return this.jobCreation;
    }
    
    
    
    /**
     * 
     * @return Calculated
     */
    public Calculated getCalculated() {
        return this.calculated;
    }
    
    
    
    /**
     * 
     * @return FirmExits
     */
    public FirmExits getFirmExits() {
        return this.firmExits;
    }
    
    
    
    /**
     * 
     * @return Establishments
     */
    public Establishments getEstablishments() {
        return this.establishments;
    }
    
    
    
    /**
     * The Davis-Haltiwanger-Schuh (DHS) denominator is the two-period trailing moving average of employment, intended to prevent transitory shocks from distorting net growth. In other words, this value roughly represents the employment for the area, but is resistant to sudden, spiking growth.
     * @return Integer
     */
    public Integer getDhsDenominator() {
        return this.dhsDenominator;
    }
    
    
    
	
	/**
	 * Creates a string based representation of this Data.
	
	 * @return String
	 */
	public String toString() {
		return "Data[" +jobDestruction+", "+numberOfFirms+", "+jobCreation+", "+calculated+", "+firmExits+", "+establishments+", "+dhsDenominator+"]";
	}
	
	/**
	 * Internal constructor to create a Data from a  representation.
	 * @param json_data The raw json data that will be parsed.
	 */
    public Data(JSONObject json_data) {
        //System.out.println(json_data);
        
        try {
            // Job Destruction
            this.jobDestruction = new JobDestruction((JSONObject)json_data.get("Job Destruction"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Data; the field jobDestruction was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Data; the field jobDestruction had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Number of Firms
            this.numberOfFirms = ((Number)json_data.get("Number of Firms")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Data; the field numberOfFirms was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Data; the field numberOfFirms had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Job Creation
            this.jobCreation = new JobCreation((JSONObject)json_data.get("Job Creation"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Data; the field jobCreation was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Data; the field jobCreation had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Calculated
            this.calculated = new Calculated((JSONObject)json_data.get("Calculated"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Data; the field calculated was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Data; the field calculated had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Firm Exits
            this.firmExits = new FirmExits((JSONObject)json_data.get("Firm Exits"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Data; the field firmExits was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Data; the field firmExits had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Establishments
            this.establishments = new Establishments((JSONObject)json_data.get("Establishments"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Data; the field establishments was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Data; the field establishments had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // DHS Denominator
            this.dhsDenominator = ((Number)json_data.get("DHS Denominator")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Data; the field dhsDenominator was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Data; the field dhsDenominator had the wrong structure.");
    		e.printStackTrace();
        }
        
	}	
}