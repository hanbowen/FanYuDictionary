package entity;

import com.google.gson.annotations.Expose;

public class WordOrder extends Entity implements Comparable<WordOrder>{

	@Expose private String word;
	
	@Expose private Long order;
	
	@Expose private String blockName;

	public String getWord() {
		return word;
	}

	public void setWord(String word) {
		this.word = word;
	}

	public Long getOrder() {
		return order;
	}

	public void setOrder(Long order) {
		this.order = order;
	}
	
	public String getBlockName() {
		return blockName;
	}

	public void setBlockName(String blockName) {
		this.blockName = blockName;
	}

	@Override
	public int compareTo(WordOrder o) {
		if(this.getOrder() == null) {
			System.out.println();
		}
		
		if(o.getOrder() == null) {
			System.out.println();
		}
		return this.getOrder().compareTo(o.getOrder());
	}
	
	
	
}
