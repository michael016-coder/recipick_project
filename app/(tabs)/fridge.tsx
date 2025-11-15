import { Text, View } from 'react-native';


export default function FridgeScreen() {
    return (
        <View 
            style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 16,
                margin: 8,
                borderRadius: 8,
                backgroundColor: '#ffffff',
                borderColor: '#ddd',
                borderWidth: 1
          }}
        

        >
            <Text>내 냉장고 화면입니다</Text>
        </View>
    );
}
