package utils

import "math/rand"

func Roll(sides int, rolls int) int {
    sum := 0
    for i := 0; i < rolls; i++ {
        sum += rand.Int() % (sides + 1)
    }
    return sum
}

func () {

}
