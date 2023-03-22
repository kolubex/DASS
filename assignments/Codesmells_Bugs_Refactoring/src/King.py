class King:
    def __init__(self, x, y, health, damage, speed):
        self.x = x
        self.y = y
        self.health = health
        self.damage = damage
        self.speed = speed
    
    def attack(self, enemy):
        if((abs(self.x - enemy.x)<= 13 and (abs(self.y-enemy.y)<=6) and (enemy.health > 0))):
            enemy.health -= self.damage
            return True
        else :
            return False