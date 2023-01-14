import ReactNative, { Button, Dimensions, FlatList, NativeModules, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef } from 'react';
import { RootNavigationProps } from '../../navigation';
const { width: SCREEN_WIDTH } = Dimensions.get('window');
function getDaysInMonthUTC(month: number, year: number) {
    var date = new Date(Date.UTC(year, month, 2));
    var days = [];
    while (date.getUTCMonth() >= month) {
        days.push(new Date(date));
        date.setUTCDate(date.getUTCDate() + 1);
    }
    return days;
}

function getAllDaysInMonth(year: number, month: number) {
    const date = new Date(year, month, 1);

    const dates = [];

    while (date.getMonth() === month) {
        dates.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }

    return dates;
}

//custom hook to create multiples refs
const useRefs = <T extends any>(length: number) => {
    const [refs, setRefs] = React.useState<Array<React.RefObject<T>>>([]);
    React.useEffect(() => {
        setRefs((refs) =>
            Array.from({ length }, (_,
                i) => refs[i] || React.createRef<T>()),
        );
    }, [length]);
    return { refs };
};


interface HeaderProps {
    days: Array<Date>;
}

const Header: React.FC<HeaderProps> = ({ days }) => {
    const scrollviewRef = useRef<ScrollView>(null);
    const { refs } = useRefs<View>(days.length);
    const [selectDay, setSelectDay] = React.useState(new Date().getDate());
    const [dataSourceCords, setDataSourceCords] = React.useState<Array<number>>([]);
    const [selectedIndex, setSelectedIndex] = React.useState(0);


    React.useEffect(() => {
        setTimeout(() => {
            if (dataSourceCords.length > 0 && selectDay === new Date().getDate()) {
                scrollviewRef.current?.scrollTo({ x: selectedIndex - SCREEN_WIDTH * 0.43, y: 0, animated: true });
            }
        }, 100);
    }, [selectedIndex]);

    const scrollToElement = (day: number, index: number) => {
        //automatict scroll and centering to selected day

        setSelectDay(day);
        if (refs[index].current) {
            refs[index].current?.measure((fx, fy, width, height, px, py) => {
                scrollviewRef.current?.scrollTo({
                    x: dataSourceCords[index - 1] - SCREEN_WIDTH / 2 + width + 30,
                    y: 0,
                    animated: true,
                });
            });
        }

    };
    return (
        <View style={{ paddingHorizontal: 8 }}>
            <ScrollView
                ref={scrollviewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ flexDirection: 'row', }}
                bounces
                decelerationRate={10}
            >
                {
                    days.map((day, index) => {
                        const itemDay = new Date(day).getDate();
                        return (
                            <View
                                onLayout={(event) => {
                                    const layout = event.nativeEvent.layout;
                                    dataSourceCords[index] = layout.x;
                                    setDataSourceCords(dataSourceCords);
                                    if (itemDay === selectDay) {
                                        setSelectedIndex(layout.x);
                                    }
                                }}
                                style={{ flex: 1, flexDirection: 'row', padding: 4, }}
                                key={index}
                                ref={refs[index]}
                            >

                                <TouchableOpacity

                                    onPress={() => scrollToElement(itemDay, index)}
                                >
                                    <View style={{
                                        backgroundColor: selectDay == itemDay ? 'skyblue' : 'white',
                                        padding: 16,
                                        borderColor: 'black',
                                        borderWidth: 1,
                                        borderRadius: 5,
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 2,
                                        },
                                        shadowOpacity: 0.01,
                                        shadowRadius: 3.84,
                                        elevation: 5,
                                    }}>
                                        <Text>{itemDay}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        );
                    })
                }
            </ScrollView>
        </View>
    );
};

const Home: React.FC<RootNavigationProps<'Home'>> = ({ navigation }) => {

    const [selectDay, setSelectDay] = React.useState(new Date().getDate());
    const date = new Date('2023-01-24');
    const [days, setDays] = React.useState(getAllDaysInMonth(date.getFullYear(), date.getMonth()));
    //create scrollview ref 

    const goTo = () => {
        navigation.navigate('HomeStack', { screen: 'Detail' });
    };

    const selectedDay = (day: number) => {
        //automatict scroll and centering to selected day
        setSelectDay(day);
    };

    return (
        <View style={{ flex: 1 }}>
            {/* Button to navigate */}

            <Header days={days} />

            <View style={{ flex: 1, paddingHorizontal: 8 }}>
                <FlatList
                    data={["1", "2"]}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ flex: 1, borderColor: 'red', borderWidth: 1 }}>
                                <Text>{"Appoiment"}</Text>
                            </View>

                        );
                    }}
                />
            </View>
            {/* <Button title="Go to Detail" onPress={goTo} /> */}
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({});