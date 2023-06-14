import React, { useState, useEffect } from "react"
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    FlatList,
    SafeAreaView,
    TouchableOpacity
} from "react-native"
import axios from "axios"

//tob tabs
const listTab = [
    {
        status: "All"
    },
    {
        status: "Available"
    },
    {
        status: "Occupied"
    }
]

const data = [
    {
        name: "Dock 1",
        availability: "Available",
        id: "1"
    },
    {
        name: "Dock 2",
        availability: "Available",
        id: "2"
    },
    {
        name: "Dock 3",
        availability: "Occupied",
        id: "3"
    },
    {
        name: "Dock 4",
        availability: "Available",
        id: "4"
    }
]

const App = () => {
    const [status, setStatus] = useState("All")
    const [docks, setDocks] = useState([null])

    const [datalist, setDataList] = useState(data)

    // handles tabs
    const handleCategoryPress = status => {
        if (status !== "All") {
            setDataList([...data.filter(e => e.availability === status)])
            console.info(datalist)
        } else {
            setDataList(data)
            console.info(datalist)
        }
        setStatus(status)
    }

    //fetch data from db using axios
    useEffect(() => {
        const fetchAllDocks = async () => {
            try {
                /*Android emulates an actual device and thus cannot access localhost by itself.
                 To connect it to the backend and db it needs to connect to your computer's IP address
                 For more info visit: https://stackoverflow.com/questions/67052333/network-error-when-running-axios-with-react-native
                 Ideally future projects can switch to other developing platforms (iOS and/or webpage)
                 */
                const res = await axios.get("145.93.121.62:8800/dock")
                setDocks(res.data)
                return res.data
            } catch (err) {
                if (err.response) {
                    console.log("Response error")
                    console.log(err.response)
                    console.log(err.response.headers)
                    console.log(err.response.status)
                    console.log(err.response.data)
                } else if (err.request) {
                    console.log("Request error. No response received")
                    console.log(err.request)
                } else {
                    console.log("Another error")
                }
            }
        }
        fetchAllDocks()
    }, [])

    //console.log(docks)

    const handleEditPress = null

    const handleDeletePress = null

    // List wrapper
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.listTab}>
                {listTab.map(e => (
                    <TouchableOpacity
                        activeOpacity={0.2}
                        style={[
                            styles.btnTab,
                            String(status) === e.status && styles.btnTabActive
                        ]}
                        onPress={() => handleCategoryPress(e.status)}
                    >
                        <Text
                            style={[
                                styles.textTab,
                                String(status) === e.status && styles.textTabActive
                            ]}
                        >
                            {e.status}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={datalist}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.entryBox}>
                        {/* <Text style={styles.itemBox}>{item.name}</Text>
                        <Text style={styles.itemBox}>{[item.availability]}</Text>
                        <Text style={styles.itemBox}>{[item.id]}</Text> */}
                        <TouchableOpacity activeOpacity={0.2}>
                            <Text
                                //onPress={() => handleEditPress}
                                style={styles.editBtn}
                            >
                                Edit
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text
                                //onPress={() => handleDeletePress}
                                style={styles.deleteBtn}
                            >
                                Delete
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

export default App

//Stylesheets
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: "center"
    },
    listTab: {
        backgroundColor: "#fff",
        padding: 15,
        flexDirection: "row"
    },
    btnTab: {
        width: Dimensions.get("window").width / 3.5,
        flexDirection: "row",
        borderWidth: 0.5,
        borderColor: "#EBEBEB",
        padding: 10,
        justifyContent: "center"
    },
    textTab: {
        fontSize: 16
    },
    btnTabActive: {
        backgroundColor: "#FFC300"
    },
    textTabActive: {
        color: "#fff"
    },
    entryBox: {
        flexDirection: "row",
        flexWrap: "nowrap",
        flexBasis: 50,
        flexShrink: 1,
        flexGrow: 1,
        justifyContent: "space-evenly"
    },
    itemBox: {
        flexDirection: "row",
        fontSize: 20,
        paddingHorizontal: 10
    },
    editBtn: {
        fontSize: 20,
        paddingHorizontal: 20,
        backgroundColor: "#DAF7A6"
    },
    deleteBtn: {
        fontSize: 20,
        paddingHorizontal: 20,
        backgroundColor: "#C70039"
    }
})
