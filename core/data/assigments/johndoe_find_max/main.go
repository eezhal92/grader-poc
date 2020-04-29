package main

import (
    "bufio"
    "fmt"
    "os"
	"strconv"
	"strings"
)

// Put your solution inside this function
func findMax (array []int64) int64 {
	// Your solution
	max := int64(0)

	for i := 0; i < len(array); i++ {
		if array[i] > max {
			max = array[i]
		}
	}

	return max
}

func getArrayFromLine(line []byte) []int64 {
	split := strings.Split(string(line), ",")
	array := make([]int64, 0)
	for i := 0; i < len(split); i++ {
		el, _ := strconv.ParseInt(split[i], 10, 64)
		array = append(array, el)
	}

	return array
}

func main() {
	reader := bufio.NewReader(os.Stdin)
    ns, _, _ := reader.ReadLine()
	n, _ := strconv.Atoi(string(ns))
	
	for i := 0; i < n; i++ {
		line, _, _ := reader.ReadLine()
		array := getArrayFromLine(line)
		result := findMax(array)
		fmt.Println(result)
	}
}
