import javax.swing.*;

public class Principal {
    public static void main(String[] args) {
        Teste t = new Teste("Minha janela");
        t.setSize(300,300);
        t.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        t.setVisible(true);
    }
}//class
