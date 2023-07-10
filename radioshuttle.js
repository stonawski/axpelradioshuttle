const ModbusRTU = require("modbus-serial");

const gatewayIpAddress = "192.168.0.172";
const tcpPort = 502;
const unitId = 1;

const storePallet = async (shuttle) => {
    console.log("Storepallet function");
    console.log("ShuttleNumber: " + shuttle);
    const client = new ModbusRTU();

    try {
        await client.connectTCP(gatewayIpAddress, { port: tcpPort });
        console.log("Connected to Radioshuttle device over Modbus TCP");

        // Write store request
        await client.setID(unitId);
        await client.writeRegister(0, 1); // Address 0 represents tag #4 BIT 02.0.1

        console.log("Pallet stored successfully");
        client.close();
    } catch (error) {
        console.error("Error storing pallet:", error);
        client.close();
        throw error;
    }
};

storePallet(1).catch((error) => {
    // Handle the error here
    console.error("Unhandled error:", error);
});