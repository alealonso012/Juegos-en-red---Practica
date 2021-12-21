package com.example.demo;
import java.io.Serializable;

public class Usuario implements Serializable {
	private static final long serialVersionUID = 1L;
	private String nickname;
    private String password;
    private int partidas; 
    private int ganadas;

    public Usuario() {
    }

    public Usuario(String nickname, String password) {
        this.nickname = nickname;
        this.password = password;
        this.partidas = 0;
        this.ganadas = 0;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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
