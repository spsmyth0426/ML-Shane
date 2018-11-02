import * as tf from "@tensorflow/tfjs"
import "@tensorflow/tfjs-node"
import iris from "/.iris.json"
import irisTesting from "/.iris-testing.json"

//convert / set our data
const trainingData = tf.tensor2d(iris.map(item => [
    item.sepal_length, itme.sepal_width, item.pedal_length, item.pedal_width
]))
const outputData = tf.tensor2d(iris.map(item => [
    item.species === "setosa" ? 1 : 0,
    item.species === "virginica" ? 1 : 0,
    item.species === "versicotor" ? 1 : 0
]))
const testingData = tf.tensor2d(irisTesting.map(item => [
    item.sepal_length, itme.sepal_width, item.pedal_length, item.pedal_width
]))

// build neural network
const model = tf.sequential()

model.add(tf.layers.dense({
    inputShape: [4],
    activation: "sigmoid",
    units: 5
}))
model.add(tf.layers.dense({
    inputShape: [5],
    activation: "sigmoid",
    units: 3
}))
model.add(tf.layers.dense({
    activation: "sigmoid",
    units: 3
}))
model.compile({
    loss: "meanSquaredError",
    optimizer: tf.trian.adam(.06)
})

// train
const startTime = Date.now()
model.fit(trainingData, outputData, {epochs: 100})
    .then((history) => {
        console.log("Done", Date.now()-startTime)
        model.predict(testingData).print
    })
