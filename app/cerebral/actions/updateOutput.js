export default function updateOutput(oldName, newName) {
    var updateOutput = function(input, tree, output) {
        var data = {}
        data[newName] = input[oldName]
        output(data)
    }
    updateOutput.displayName = 'update-' + oldName + '-to-' + newName;
    return updateOutput;
}