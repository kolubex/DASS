class Hut:
    def __init__(self, x, y, health):
        self.x = x
        self.y = y
        self.health = health

class Th(Hut):
    def __init__(self, x, y, health):
        super().__init__(x,y,health)

class Can(Hut):
    def __init__(self,x,y,health,damage):
        super().__init__(x,y,health)
        self.damage = damage
    
    def defense(self,enemy):
        if((abs(self.x - enemy.x)<= 10 and (abs(self.y-enemy.y)<=5) and (enemy.health > 0))):
            enemy.health -= self.damage
            return True
        else :
            return False