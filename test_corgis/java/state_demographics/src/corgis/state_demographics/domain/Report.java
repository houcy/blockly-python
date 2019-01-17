package corgis.state_demographics.domain;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import corgis.state_demographics.domain.Ethnicities;
import corgis.state_demographics.domain.Age;
import corgis.state_demographics.domain.Miscellaneous;
import corgis.state_demographics.domain.Sales;
import corgis.state_demographics.domain.Income;
import corgis.state_demographics.domain.Education;
import corgis.state_demographics.domain.Employment;
import corgis.state_demographics.domain.Housing;
import corgis.state_demographics.domain.Population;

/**
 * 
 */
public class Report {
	
    // percent, 2014
    private Ethnicities ethnicities;
    // percent, 2014
    private Age age;
    private Miscellaneous miscellaneous;
    // 2007
    private Sales sales;
    private String state;
    // 2009-2013
    private Income income;
    // percent, 2009-2013
    private Education education;
    private Employment employment;
    private Housing housing;
    private Population population;
    
    
    /**
     * percent, 2014
     * @return Ethnicities
     */
    public Ethnicities getEthnicities() {
        return this.ethnicities;
    }
    
    
    
    /**
     * percent, 2014
     * @return Age
     */
    public Age getAge() {
        return this.age;
    }
    
    
    
    /**
     * 
     * @return Miscellaneous
     */
    public Miscellaneous getMiscellaneous() {
        return this.miscellaneous;
    }
    
    
    
    /**
     * 2007
     * @return Sales
     */
    public Sales getSales() {
        return this.sales;
    }
    
    
    
    /**
     * 
     * @return String
     */
    public String getState() {
        return this.state;
    }
    
    
    
    /**
     * 2009-2013
     * @return Income
     */
    public Income getIncome() {
        return this.income;
    }
    
    
    
    /**
     * percent, 2009-2013
     * @return Education
     */
    public Education getEducation() {
        return this.education;
    }
    
    
    
    /**
     * 
     * @return Employment
     */
    public Employment getEmployment() {
        return this.employment;
    }
    
    
    
    /**
     * 
     * @return Housing
     */
    public Housing getHousing() {
        return this.housing;
    }
    
    
    
    /**
     * 
     * @return Population
     */
    public Population getPopulation() {
        return this.population;
    }
    
    
    
	
	/**
	 * Creates a string based representation of this Report.
	
	 * @return String
	 */
	public String toString() {
		return "Report[" +ethnicities+", "+age+", "+miscellaneous+", "+sales+", "+state+", "+income+", "+education+", "+employment+", "+housing+", "+population+"]";
	}
	
	/**
	 * Internal constructor to create a Report from a  representation.
	 * @param json_data The raw json data that will be parsed.
	 */
    public Report(JSONObject json_data) {
        //System.out.println(json_data);
        
        try {
            // Ethnicities
            this.ethnicities = new Ethnicities((JSONObject)json_data.get("Ethnicities"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Report; the field ethnicities was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Report; the field ethnicities had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Age
            this.age = new Age((JSONObject)json_data.get("Age"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Report; the field age was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Report; the field age had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Miscellaneous
            this.miscellaneous = new Miscellaneous((JSONObject)json_data.get("Miscellaneous"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Report; the field miscellaneous was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Report; the field miscellaneous had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Sales
            this.sales = new Sales((JSONObject)json_data.get("Sales"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Report; the field sales was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Report; the field sales had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // State
            this.state = (String)json_data.get("State");
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Report; the field state was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Report; the field state had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Income
            this.income = new Income((JSONObject)json_data.get("Income"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Report; the field income was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Report; the field income had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Education
            this.education = new Education((JSONObject)json_data.get("Education"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Report; the field education was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Report; the field education had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Employment
            this.employment = new Employment((JSONObject)json_data.get("Employment"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Report; the field employment was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Report; the field employment had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Housing
            this.housing = new Housing((JSONObject)json_data.get("Housing"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Report; the field housing was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Report; the field housing had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // Population
            this.population = new Population((JSONObject)json_data.get("Population"));
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Report; the field population was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Report; the field population had the wrong structure.");
    		e.printStackTrace();
        }
        
	}	
}