package pl.kowalskidawid.chat;

public class ChatMessage {
    private String value;
    private String name;

    public ChatMessage(String value, String name) {
        this.value = value;
        this.name = name;
    }

    public ChatMessage() {
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "{" +
                "\"value\":\"" + value + '\"' +
                ", \"name\":\"" + name + '\"' +
                '}';
    }
}
