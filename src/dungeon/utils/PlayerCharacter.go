package utils

import (
    "fmt"
)

type PlayerCharacter struct {
    name string

    race string

    // Statistics
    max_hp int
    hp int

    inventory map[string]int
}

func (pc PlayerCharacter) is_alive() bool {
    return pc.hp > 0
}

func (pc PlayerCharacter) is_dead() bool {
    return !pc.is_alive()
}


func main() {
    pc := PlayerCharacter{}
    pc.hp = 10
    fmt.Printf("%t", pc.is_alive())
    /*
    goweb.MapFunc("/people/{name}/animals/{animal_name}", func(c *goweb.Context) {
    
        fmt.Fprintf(c.ResponseWriter, "Hey %s, your favourite animal is a %s", c.PathParams["name"], c.PathParams["animal_name"])
        
    })

    goweb.ListenAndServe(":8080")
    */
}