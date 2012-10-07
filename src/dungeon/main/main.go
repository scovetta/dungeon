package main

import (
    "fmt"
    "dungeon/utils"
)

func main() {
    pc := PlayerCharacter{}
    pc.hp = 10
    fmt.Printf("%t", pc.is_alive())
    fmt.Printf("%d", utils.random.Roll(6, 3))
    /*
    goweb.MapFunc("/people/{name}/animals/{animal_name}", func(c *goweb.Context) {
    
        fmt.Fprintf(c.ResponseWriter, "Hey %s, your favourite animal is a %s", c.PathParams["name"], c.PathParams["animal_name"])
        
    })

    goweb.ListenAndServe(":8080")
    */
}