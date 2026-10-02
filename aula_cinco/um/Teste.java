import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class Teste extends JFrame implements ActionListener {
    private JLabel jLabel;
    private JTextField jTextField;
    private JButton jButton;

    public Teste(String titulo){
        setTitle(titulo);
        setLayout(new FlowLayout());
        jLabel = new JLabel("Nome: ");
        jTextField = new JTextField(20);
        jButton = new JButton("CLICAR");
        add(jLabel);
        add(jTextField);
        add(jButton);
        jButton.addActionListener(this);
    }//construtor

    @Override
    public void actionPerformed(ActionEvent e) {
        JOptionPane.showMessageDialog(null,
                "Bem-vindo "+jTextField.getText());
    }
}//class
