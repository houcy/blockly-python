package corgis.construction_spending.domain;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;


/**
 * 
 */
public class Combined {
	
    // Lodging includes hotels, motels, resort lodging, tourist courts and cabins, and similar facilities. The annual data represents data for the whole year, adjusted for seasonal variations (i.e. winter usually has less construction). The combined data represents both privately and publicly funded projects. All units are reported in millions of dollars.
    private Integer lodging;
    // Education includes preschool, primary, secondary, higher education, nursing schools, cosmetology and beauty schools, trade schools, military training facilities, schools for the handicapped, and modeling schools. The annual data represents data for the whole year, adjusted for seasonal variations (i.e. winter usually has less construction). The combined data represents both privately and publicly funded projects. All units are reported in millions of dollars.
    private Integer educational;
    // This section is the total of all the other categories, and by extension the total of the residential and non-residential categories. The annual data represents data for the whole year, adjusted for seasonal variations (i.e. winter usually has less construction). The combined data represents both privately and publicly funded projects. All units are reported in millions of dollars.
    private Integer totalConstruction;
    // Transportation involves all the facilities related to air, land, and water travel. The annual data represents data for the whole year, adjusted for seasonal variations (i.e. winter usually has less construction). The combined data represents both privately and publicly funded projects. All units are reported in millions of dollars.
    private Integer transportation;
    // Power includes electric, gas, and oil, and also includes distribution structures. The annual data represents data for the whole year, adjusted for seasonal variations (i.e. winter usually has less construction). The combined data represents both privately and publicly funded projects. All units are reported in millions of dollars.
    private Integer power;
    // Offices include financial, corporate, television, radio, and even manufacturing site offices. The annual data represents data for the whole year, adjusted for seasonal variations (i.e. winter usually has less construction). The combined data represents both privately and publicly funded projects. All units are reported in millions of dollars.
    private Integer office;
    // A categorization including all of the other categories except total and residential. The annual data represents data for the whole year, adjusted for seasonal variations (i.e. winter usually has less construction). The combined data represents both privately and publicly funded projects. All units are reported in millions of dollars.
    private Integer nonresidential;
    // Amusement and recreation includes theme and amusement parks, sports, fitness, performance/meeting center, social centers, parks, camps, movie theaters, studios, and a host of other locations. The annual data represents data for the whole year, adjusted for seasonal variations (i.e. winter usually has less construction). The combined data represents both privately and publicly funded projects. All units are reported in millions of dollars.
    private Integer amusementAndRecreation;
    // Residential Buildings are houses, townhouses, apartments, etc. for single families, multi-families, and improvements to existing properties. The annual data represents data for the whole year, adjusted for seasonal variations (i.e. winter usually has less construction). The combined data represents both privately and publicly funded projects. All units are reported in millions of dollars.
    private Integer residential;
    // Public Safety includes correctional centers, police offices, fire and rescue. The annual data represents data for the whole year, adjusted for seasonal variations (i.e. winter usually has less construction). The combined data represents both privately and publicly funded projects. All units are reported in millions of dollars.
    private Integer publicSafety;
    // Conservation and development includes facilities constructed for dams/leevees, breakwaters/jettys, dredging, irrigation, mine reclamation, fish hatcheries and wetlands. The annual data represents data for the whole year, adjusted for seasonal variations (i.e. winter usually has less construction). The combined data represents both privately and publicly funded projects. All units are reported in millions of dollars.
    private Integer conservationAndDevelopment;
    // Commercial includes buildings and structures used by the retail, wholesale and selected service industries. The annual data represents data for the whole year, adjusted for seasonal variations (i.e. winter usually has less construction). The combined data represents both privately and publicly funded projects. All units are reported in millions of dollars.
    private Integer commercial;
    // Water Supply construction involves plants, wells, lines, pump stations, resevoirs, and tanks/towers. The annual data represents data for the whole year, adjusted for seasonal variations (i.e. winter usually has less construction). The combined data represents both privately and publicly funded projects. All units are reported in millions of dollars.
    private Integer waterSupply;
    // Health Care includes hospitals, medical buildings, and special care. The annual data represents data for the whole year, adjusted for seasonal variations (i.e. winter usually has less construction). The combined data represents both privately and publicly funded projects. All units are reported in millions of dollars.
    private Integer healthCare;
    // This section includes sewage, dry waste, and waste water plants and line/pump stations. The annual data represents data for the whole year, adjusted for seasonal variations (i.e. winter usually has less construction). The combined data represents both privately and publicly funded projects. All units are reported in millions of dollars.
    private Integer sewageAndWasteDisposal;
    // Communication includes telephone, television, and radio, distribution and maintenance buildings and structures. The annual data represents data for the whole year, adjusted for seasonal variations (i.e. winter usually has less construction). The combined data represents both privately and publicly funded projects. All units are reported in millions of dollars.
    private Integer communication;
    // Manufacturing includes a wide variety of structures, including wood industries, paper industries, food/beverage/tobacco, textiles, printing, plastic, chemical, and much more. The annual data represents data for the whole year, adjusted for seasonal variations (i.e. winter usually has less construction). The combined data represents both privately and publicly funded projects. All units are reported in millions of dollars.
    private Integer manufacturing;
    // Religious includes houses of worship such as churches, chapels, mosques, and their auxiliary buildings. The annual data represents data for the whole year, adjusted for seasonal variations (i.e. winter usually has less construction). The combined data represents both privately and publicly funded projects. All units are reported in millions of dollars.
    private Integer religious;
    // Highway and Street includes pavement, lighting, retaining walls, tunnels, bridges, tolls/weighs, maintenance buildings, and rest facilities. The annual data represents data for the whole year, adjusted for seasonal variations (i.e. winter usually has less construction). The combined data represents both privately and publicly funded projects. All units are reported in millions of dollars.
    private Integer highwayAndStreet;
    
    
    /**
     * Lodging includes hotels, motels, resort lodging, tourist courts and cabins, and similar facilities. The annual data represents data for the whole year, adjusted for seasonal variations (i.e. winter usually has less construction). The combined data represents both privately and publicly funded projects. All units are reported in millions of dollars.
     * @return Integer
     */
    public Integer getLodging() {
        return this.lodging;
    }
    
    
    
    /**
     * Education includes preschool, primary, secondary, higher education, nursing schools, cosmetology and beauty schools, trade schools, military training facilities, schools for the handicapped, and modeling schools. The annual data represents data for the whole year, adjusted for seasonal variations (i.e. winter usually has less construction). The combined data represents both privately and publicly funded projects. All units are reported in millions of dollars.
     * @return Integer
     */
    public Integer getEducational() {
        return this.educational;
    }
    
    
    
    /**
     * This section is the total of all the other categories, and by extension the total of the residential and non-residential categories. The annual data represents data for the whole year, adjusted for seasonal variations (i.e. winter usually has less construction). The combined data represents both privately and publicly funded projects. All units are reported in millions of dollars.
     * @return Integer
     */
    public Integer getTotalConstruction() {
        return this.totalConstruction;
    }
    
    
    
    /**
     * Transportation involves all the facilities related to air, land, and water travel. The annual data represents data for the whole year, adjusted for seasonal variations (i.e. winter usually has less construction). The combined data represents both privately and publicly funded projects. All units are reported in millions of dollars.
     * @return Integer
     */
    public Integer getTransportation() {
        return this.transportation;
    }
    
    
    
    /**
     * Power includes electric, gas, and oil, and also includes distribution structures. The annual data represents data for the whole year, adjusted for seasonal variations (i.e. winter usually has less construction). The combined data represents both privately and publicly funded projects. All units are reported in millions of dollars.
     * @return Integer
     */
    public Integer getPower() {
        return this.power;
    }
    
    
    
    /**
     * Offices include financial, corporate, television, radio, and even manufacturing site offices. The annual data represents data for the whole year, adjusted for seasonal variations (i.e. winter usually has less construction). The combined data represents both privately and publicly funded projects. All units are reported in millions of dollars.
     * @return Integer
     */
    public Integer getOffice() {
        return this.office;
    }
    
    
    
    /**
     * A categorization including all of the other categories except total and residential. The annual data represents data for the whole year, adjusted for seasonal variations (i.e. winter usually has less construction). The combined data represents both privately and publicly funded projects. All units are reported in millions of dollars.
     * @return Integer
     */
    public Integer getNonresidential() {
        return this.nonresidential;
    }
    
    
    
    /**
     * Amusement and recreation includes theme and amusement parks, sports, fitness, performance/meeting center, social centers, parks, camps, movie theaters, studios, and a host of other locations. The annual data represents data for the whole year, adjusted for seasonal variations (i.e. winter usually has less construction). The combined data represents both privately and publicly funded projects. All units are reported in millions of dollars.
     * @return Integer
     */
    public Integer getAmusementAndRecreation() {
        return this.amusementAndRecreation;
    }
    
    
    
    /**
     * Residential Buildings are houses, townhouses, apartments, etc. for single families, multi-families, and improvements to existing properties. The annual data represents data for the whole year, adjusted for seasonal variations (i.e. winter usually has less construction). The combined data represents both privately and publicly funded projects. All units are reported in millions of dollars.
     * @return Integer
     */
    public Integer getResidential() {
        return this.residential;
    }
    
    
    
    /**
     * Public Safety includes correctional centers, police offices, fire and rescue. The annual data represents data for the whole year, adjusted for seasonal variations (i.e. winter usually has less construction). The combined data represents both privately and publicly funded projects. All units are reported in millions of dollars.
     * @return Integer
     */
    public Integer getPublicSafety() {
        return this.publicSafety;
    }
    
    
    
    /**
     * Conservation and development includes facilities constructed for dams/leevees, breakwaters/jettys, dredging, irrigation, mine reclamation, fish hatcheries and wetlands. The annual data represents data for the whole year, adjusted for seasonal variations (i.e. winter usually has less construction). The combined data represents both privately and publicly funded projects. All units are reported in millions of dollars.
     * @return Integer
     */
    public Integer getConservationAndDevelopment() {
        return this.conservationAndDevelopment;
    }
    
    
    
    /**
     * Commercial includes buildings and structures used by the retail, wholesale and selected service industries. The annual data represents data for the whole year, adjusted for seasonal variations (i.e. winter usually has less construction). The combined data represents both privately and publicly funded projects. All units are reported in millions of dollars.
     * @return Integer
     */
    public Integer getCommercial() {
        return this.commercial;
    }
    
    
    
    /**
     * Water Supply construction involves plants, wells, lines, pump stations, resevoirs, and tanks/towers. The annual data represents data for the whole year, adjusted for seasonal variations (i.e. winter usually has less construction). The combined data represents both privately and publicly funded projects. All units are reported in millions of dollars.
     * @return Integer
     */
    public Integer getWaterSupply() {
        return this.waterSupply;
    }
    
    
    
    /**
     * Health Care includes hospitals, medical buildings, and special care. The annual data represents data for the whole year, adjusted for seasonal variations (i.e. winter usually has less construction). The combined data represents both privately and publicly funded projects. All units are reported in millions of dollars.
     * @return Integer
     */
    public Integer getHealthCare() {
        return this.healthCare;
    }
    
    
    
    /**
     * This section includes sewage, dry waste, and waste water plants and line/pump stations. The annual data represents data for the whole year, adjusted for seasonal variations (i.e. winter usually has less construction). The combined data represents both privately and publicly funded projects. All units are reported in millions of dollars.
     * @return Integer
     */
    public Integer getSewageAndWasteDisposal() {
        return this.sewageAndWasteDisposal;
    }
    
    
    
    /**
     * Communication includes telephone, television, and radio, distribution and maintenance buildings and structures. The annual data represents data for the whole year, adjusted for seasonal variations (i.e. winter usually has less construction). The combined data represents both privately and publicly funded projects. All units are reported in millions of dollars.
     * @return Integer
     */
    public Integer getCommunication() {
        return this.communication;
    }
    
    
    
    /**
     * Manufacturing includes a wide variety of structures, including wood industries, paper industries, food/beverage/tobacco, textiles, printing, plastic, chemical, and much more. The annual data represents data for the whole year, adjusted for seasonal variations (i.e. winter usually has less construction). The combined data represents both privately and publicly funded projects. All units are reported in millions of dollars.
     * @return Integer
     */
    public Integer getManufacturing() {
        return this.manufacturing;
    }
    
    
    
    /**
     * Religious includes houses of worship such as churches, chapels, mosques, and their auxiliary buildings. The annual data represents data for the whole year, adjusted for seasonal variations (i.e. winter usually has less construction). The combined data represents both privately and publicly funded projects. All units are reported in millions of dollars.
     * @return Integer
     */
    public Integer getReligious() {
        return this.religious;
    }
    
    
    
    /**
     * Highway and Street includes pavement, lighting, retaining walls, tunnels, bridges, tolls/weighs, maintenance buildings, and rest facilities. The annual data represents data for the whole year, adjusted for seasonal variations (i.e. winter usually has less construction). The combined data represents both privately and publicly funded projects. All units are reported in millions of dollars.
     * @return Integer
     */
    public Integer getHighwayAndStreet() {
        return this.highwayAndStreet;
    }
    
    
    
	
	/**
	 * Creates a string based representation of this Combined.
	
	 * @return String
	 */
	public String toString() {
		return "Combined[" +lodging+", "+educational+", "+totalConstruction+", "+transportation+", "+power+", "+office+", "+nonresidential+", "+amusementAndRecreation+", "+residential+", "+publicSafety+", "+conservationAndDevelopment+", "+commercial+", "+waterSupply+", "+healthCare+", "+sewageAndWasteDisposal+", "+communication+", "+manufacturing+", "+religious+", "+highwayAndStreet+"]";
	}
	
	/**
	 * Internal constructor to create a Combined from a  representation.
	 * @param json_data The raw json data that will be parsed.
	 */
    public Combined(JSONObject json_data) {
        //System.out.println(json_data);
        
        try {
            // lodging
            this.lodging = ((Number)json_data.get("lodging")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Combined; the field lodging was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Combined; the field lodging had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // educational
            this.educational = ((Number)json_data.get("educational")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Combined; the field educational was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Combined; the field educational had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // total construction
            this.totalConstruction = ((Number)json_data.get("total construction")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Combined; the field totalConstruction was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Combined; the field totalConstruction had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // transportation
            this.transportation = ((Number)json_data.get("transportation")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Combined; the field transportation was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Combined; the field transportation had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // power
            this.power = ((Number)json_data.get("power")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Combined; the field power was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Combined; the field power had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // office
            this.office = ((Number)json_data.get("office")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Combined; the field office was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Combined; the field office had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // nonresidential
            this.nonresidential = ((Number)json_data.get("nonresidential")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Combined; the field nonresidential was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Combined; the field nonresidential had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // amusement and recreation
            this.amusementAndRecreation = ((Number)json_data.get("amusement and recreation")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Combined; the field amusementAndRecreation was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Combined; the field amusementAndRecreation had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // residential
            this.residential = ((Number)json_data.get("residential")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Combined; the field residential was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Combined; the field residential had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // public safety
            this.publicSafety = ((Number)json_data.get("public safety")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Combined; the field publicSafety was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Combined; the field publicSafety had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // conservation and development
            this.conservationAndDevelopment = ((Number)json_data.get("conservation and development")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Combined; the field conservationAndDevelopment was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Combined; the field conservationAndDevelopment had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // commercial
            this.commercial = ((Number)json_data.get("commercial")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Combined; the field commercial was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Combined; the field commercial had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // water supply
            this.waterSupply = ((Number)json_data.get("water supply")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Combined; the field waterSupply was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Combined; the field waterSupply had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // health care
            this.healthCare = ((Number)json_data.get("health care")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Combined; the field healthCare was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Combined; the field healthCare had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // sewage and waste disposal
            this.sewageAndWasteDisposal = ((Number)json_data.get("sewage and waste disposal")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Combined; the field sewageAndWasteDisposal was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Combined; the field sewageAndWasteDisposal had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // communication
            this.communication = ((Number)json_data.get("communication")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Combined; the field communication was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Combined; the field communication had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // manufacturing
            this.manufacturing = ((Number)json_data.get("manufacturing")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Combined; the field manufacturing was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Combined; the field manufacturing had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // religious
            this.religious = ((Number)json_data.get("religious")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Combined; the field religious was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Combined; the field religious had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // highway and street
            this.highwayAndStreet = ((Number)json_data.get("highway and street")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Combined; the field highwayAndStreet was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Combined; the field highwayAndStreet had the wrong structure.");
    		e.printStackTrace();
        }
        
	}	
}