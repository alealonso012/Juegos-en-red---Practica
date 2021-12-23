package com.example.demo;


public class UsuarioReducido {
		private String nickname;
	    private int partidas; 
	    private int ganadas;
	    
	    
	    public UsuarioReducido(String name, int partidas, int ganadas) {
	    	this.nickname=name;
	    	this.partidas=partidas;
	    	this.ganadas=ganadas;
	    }
		public String getNickname() {
			return nickname;
		}
		public void setNickname(String nickname) {
			this.nickname = nickname;
		}
		public int getPartidas() {
			return partidas;
		}
		public void setPartidas(int partidas) {
			this.partidas = partidas;
		}
		public int getGanadas() {
			return ganadas;
		}
		public void setGanadas(int ganadas) {
			this.ganadas = ganadas;
		}
}
