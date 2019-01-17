package corgis.music.domain;

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
public class Artist {
	
    // The frequency of this term.
    private Double terms_Freq;
    // The term most associated with this artist.
    private String terms;
    // The name of the artist.
    private String name;
    // A measure of 0..1 for how familiar the artist is to listeners.
    private Double familiarity;
    // The home location's longitude of this artist.
    private Integer longitude;
    // A measure of the artists's popularity, when downloaded (in December 2010). Measured on a scale of 0 to 1.
    private Double hotttnesss;
    // Unknown.
    private Integer location;
    // The home location's latitude of this artist.
    private Integer latitude;
    // Unknown.
    private Double similar;
    // A unique ID for this artist.
    private String id;
    
    
    /**
     * The frequency of this term.
     * @return Double
     */
    public Double getTerms_Freq() {
        return this.terms_Freq;
    }
    
    
    
    /**
     * The term most associated with this artist.
     * @return String
     */
    public String getTerms() {
        return this.terms;
    }
    
    
    
    /**
     * The name of the artist.
     * @return String
     */
    public String getName() {
        return this.name;
    }
    
    
    
    /**
     * A measure of 0..1 for how familiar the artist is to listeners.
     * @return Double
     */
    public Double getFamiliarity() {
        return this.familiarity;
    }
    
    
    
    /**
     * The home location's longitude of this artist.
     * @return Integer
     */
    public Integer getLongitude() {
        return this.longitude;
    }
    
    
    
    /**
     * A measure of the artists's popularity, when downloaded (in December 2010). Measured on a scale of 0 to 1.
     * @return Double
     */
    public Double getHotttnesss() {
        return this.hotttnesss;
    }
    
    
    
    /**
     * Unknown.
     * @return Integer
     */
    public Integer getLocation() {
        return this.location;
    }
    
    
    
    /**
     * The home location's latitude of this artist.
     * @return Integer
     */
    public Integer getLatitude() {
        return this.latitude;
    }
    
    
    
    /**
     * Unknown.
     * @return Double
     */
    public Double getSimilar() {
        return this.similar;
    }
    
    
    
    /**
     * A unique ID for this artist.
     * @return String
     */
    public String getId() {
        return this.id;
    }
    
    
    
	
	/**
	 * Creates a string based representation of this Artist.
	
	 * @return String
	 */
	public String toString() {
		return "Artist[" +terms_Freq+", "+terms+", "+name+", "+familiarity+", "+longitude+", "+hotttnesss+", "+location+", "+latitude+", "+similar+", "+id+"]";
	}
	
	/**
	 * Internal constructor to create a Artist from a  representation.
	 * @param json_data The raw json data that will be parsed.
	 */
    public Artist(JSONObject json_data) {
        //System.out.println(json_data);
        
        try {
            // terms_freq
            this.terms_Freq = ((Number)json_data.get("terms_freq")).doubleValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Artist; the field terms_Freq was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Artist; the field terms_Freq had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // terms
            this.terms = (String)json_data.get("terms");
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Artist; the field terms was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Artist; the field terms had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // name
            this.name = (String)json_data.get("name");
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Artist; the field name was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Artist; the field name had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // familiarity
            this.familiarity = ((Number)json_data.get("familiarity")).doubleValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Artist; the field familiarity was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Artist; the field familiarity had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // longitude
            this.longitude = ((Number)json_data.get("longitude")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Artist; the field longitude was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Artist; the field longitude had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // hotttnesss
            this.hotttnesss = ((Number)json_data.get("hotttnesss")).doubleValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Artist; the field hotttnesss was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Artist; the field hotttnesss had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // location
            this.location = ((Number)json_data.get("location")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Artist; the field location was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Artist; the field location had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // latitude
            this.latitude = ((Number)json_data.get("latitude")).intValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Artist; the field latitude was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Artist; the field latitude had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // similar
            this.similar = ((Number)json_data.get("similar")).doubleValue();
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Artist; the field similar was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Artist; the field similar had the wrong structure.");
    		e.printStackTrace();
        }
        
        try {
            // id
            this.id = (String)json_data.get("id");
        } catch (NullPointerException e) {
    		System.err.println("Could not convert the response to a Artist; the field id was missing.");
    		e.printStackTrace();
    	} catch (ClassCastException e) {
    		System.err.println("Could not convert the response to a Artist; the field id had the wrong structure.");
    		e.printStackTrace();
        }
        
	}	
}