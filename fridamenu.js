
const classLoader = {
    Gravity: Java.use("android.view.Gravity"),
    TextView: Java.use("android.widget.TextView"),
    LinearLayout: Java.use("android.widget.LinearLayout"),
    ViewGroup_LayoutParams: Java.use("android.view.ViewGroup$LayoutParams"),
    LinearLayout_LayoutParams: Java.use("android.widget.LinearLayout$LayoutParams"),
    Color: Java.use("android.graphics.Color"),
    ActivityThread: Java.use("android.app.ActivityThread"),
    ActivityThread_ActivityClientRecord: Java.use("android.app.ActivityThread$ActivityClientRecord"),
    View_OnTouchListener: Java.use("android.view.View$OnTouchListener"),
    MotionEvent: Java.use("android.view.MotionEvent"),
    String: Java.use("java.lang.String"),
    ScrollView: Java.use("android.widget.ScrollView"),
    View_OnClickListener: Java.use("android.view.View$OnClickListener"),
}

function pixelsToPixelDensity(context, pixels) {
    let screenPixelDensity = context.getResources().getDisplayMetrics().density.value
    return parseInt(pixels / screenPixelDensity)
}

function getMainActivity(classLoader) {
    let activityThread = classLoader.ActivityThread.sCurrentActivityThread.value
    let mActivities = activityThread.mActivities.value
    let activityClientRecord = Java.cast(mActivities.valueAt(0), classLoader.ActivityThread_ActivityClientRecord)
    return activityClientRecord.activity.value
}


class Menu {
    #classLoader
    #activity
    #MATCH_PARENT
    #mainLayout
    #menuStart
    #menuLayout
    #menuBarLayout
    #menuBarTitle
    #menuScroll
    #menuOptions
    #options
    #contentView
    #WRAP_CONTENT
    #menuScrollLayout
    #menuScrollView
    #colorOn
    #colorOff
    
    constructor(classLoader, activity) {
        this.#classLoader = classLoader
        this.#activity = activity
        this.#MATCH_PARENT = classLoader.LinearLayout_LayoutParams.MATCH_PARENT.value
        this.#WRAP_CONTENT = classLoader.LinearLayout_LayoutParams.WRAP_CONTENT.value
        this.#options = {}
        this.#createContentView()
        this.#createMainLayout()
        this.#createMenuScroll()
    }
    
    #createContentView() {
        this.#contentView = this.#classLoader.LinearLayout.$new(this.#activity)
        const layoutParams = classLoader.LinearLayout_LayoutParams.$new(this.#MATCH_PARENT, this.#MATCH_PARENT)
        this.#contentView.setLayoutParams(layoutParams)
        this.#contentView.setGravity(this.#classLoader.Gravity.CENTER.value)
        this.#contentView.setBackgroundColor(this.#classLoader.Color.TRANSPARENT.value)
     }
     
     #createMainLayout() {
         const layoutParams = this.#classLoader.LinearLayout_LayoutParams.$new(this.#WRAP_CONTENT, this.#WRAP_CONTENT)
         this.#mainLayout = this.#classLoader.LinearLayout.$new(this.#activity)
         this.#mainLayout.setLayoutParams(layoutParams)
     }
     
     #createMenuScroll() {
         const layoutParams = this.#classLoader.LinearLayout_LayoutParams.$new(this.#MATCH_PARENT, this.#WRAP_CONTENT)
         this.#menuScrollView = this.#classLoader.ScrollView.$new(this.#activity)
         const padding = pixelsToPixelDensity(this.#activity, 30)
         this.#menuScrollView.setLayoutParams(layoutParams)
         this.#menuScrollView.setPadding(padding, padding, padding, padding)
         this.#menuScrollView.mFillViewport.value = true
     }
     
     #createMenuScrollLayout() {
         const layoutParams = this.#classLoader.LinearLayout_LayoutParams.$new(this.#MATCH_PARENT, this.#WRAP_CONTENT)
         this.#menuScrollLayout = this.#classLoader.LinearLayout.$new(this.#activity)
         this.#menuScrollLayout.setLayoutParams(layoutParams)
         this.#menuScrollLayout.setOrientation(this.#menuScrollLayout.VERTICAL.value)
     }
     
     createMenuOptionsLayout(colorOn, colorOff) {
         this.#createMenuScroll()
         this.#createMenuScrollLayout()
         this.#colorOn = colorOn
         this.#colorOff = colorOff
     }
     
     createMenuStart(title, color) {
         const layoutParams = this.#classLoader.LinearLayout_LayoutParams.$new(this.#WRAP_CONTENT, this.#WRAP_CONTENT)
         this.#menuStart = this.#classLoader.TextView.$new(this.#activity)
         this.#menuStart.setLayoutParams(layoutParams)
         this.#menuStart.setText(this.#classLoader.String.$new(title))
         this.#menuStart.setTextColor(this.#classLoader.Color.parseColor(color))
     }
     
     createMenuLayout(color, size) {
         const SIZE_DP = pixelsToPixelDensity(this.#activity, size)
         const layoutParams = this.#classLoader.LinearLayout_LayoutParams.$new(SIZE_DP, SIZE_DP)
         this.#menuLayout = this.#classLoader.LinearLayout.$new(this.#activity)
         this.#menuLayout.setLayoutParams(layoutParams)
         this.#menuLayout.setBackgroundColor(this.#classLoader.Color.parseColor(color))
         this.#menuLayout.setOrientation(this.#menuLayout.VERTICAL.value)
     }
     
     createMenuBarLayout(color) {
         const padding = pixelsToPixelDensity(this.#activity, 40)
         const layoutParams = this.#classLoader.LinearLayout_LayoutParams.$new(this.#MATCH_PARENT, this.#WRAP_CONTENT)
         this.#menuBarLayout = this.#classLoader.LinearLayout.$new(this.#activity)
         this.#menuBarLayout.setLayoutParams(layoutParams)
         this.#menuBarLayout.setBackgroundColor(this.#classLoader.Color.parseColor(color))
         this.#menuBarLayout.setPadding(padding, padding, 0, padding)
     }
     
     createMenuBarTitle(title, color) {
         const layoutParams = this.#classLoader.LinearLayout_LayoutParams.$new(this.#WRAP_CONTENT, this.#WRAP_CONTENT)
         this.#menuBarTitle = this.#classLoader.TextView.$new(this.#activity)
         this.#menuBarTitle.setLayoutParams(layoutParams)
         this.#menuBarTitle.setText(this.#classLoader.String.$new(title))
         this.#menuBarTitle.setTextColor(this.#classLoader.Color.parseColor(color))
     }
     
     #drawContentView() {
         this.#activity.addContentView(this.#contentView, this.#contentView.getLayoutParams())
      }
      
      #drawMainLayout() {
          this.#contentView.addView(this.#mainLayout)
      }
      
      #drawMenuStart() {
          this.#mainLayout.addView(this.#menuStart)
      }
      
     #drawMenuLayout() {
         this.#mainLayout.addView(this.#menuLayout)
     }
     
     #drawMenuBarLayout() {
         this.#menuLayout.addView(this.#menuBarLayout)
     }
     
     #drawMenuBarTitle() {
         this.#menuBarLayout.addView(this.#menuBarTitle)
     }
     
     #drawMenuOptions() {
         this.#menuLayout.addView(this.#menuScrollView)
         this.#menuScrollView.addView(this.#menuScrollLayout)
     }
     
     #createOptionClickEvent(id, optionView, callbacks) {
         const classLoader = this.#classLoader
         let optionState = false
         const colorOn = this.#colorOn
         const colorOff = this.#colorOff
         const optionOnClickListener = Java.registerClass({
             name: "com.example." + id,
             implements: [classLoader.View_OnClickListener],
             methods: {
                 onClick(p1) {
                     if(!optionState) {
                         p1.setBackgroundColor(classLoader.Color.parseColor(colorOn))
                         optionState = true
                         callbacks.on()
                     } else {
                         p1.setBackgroundColor(classLoader.Color.parseColor(colorOff))
                         optionState = false
                         callbacks.off()
                     }
                 }
             }
         })
         optionView.setOnClickListener(optionOnClickListener.$new())
     }
     
     addOption(id, name, callbacks) {
         const layoutParams = this.#classLoader.LinearLayout_LayoutParams.$new(this.#MATCH_PARENT, this.#WRAP_CONTENT)
         const padding = pixelsToPixelDensity(this.#activity, 20)
         const option = this.#classLoader.TextView.$new(this.#activity)
         const margin = pixelsToPixelDensity(this.#activity, 30)
         option.setText(this.#classLoader.String.$new(name))
         option.setBackgroundColor(this.#classLoader.Color.parseColor(this.#colorOff))
         option.setTextColor(this.#classLoader.Color.parseColor("#75757B"))
         layoutParams.setMargins(0, 0, 0, margin)
         option.setLayoutParams(layoutParams)
         option.setPadding(padding, padding, 0, padding)
         this.#menuScrollLayout.addView(option)
         this.#createOptionClickEvent(id, option, callbacks)
     }
    
     #createMainLayoutEvent() {
         const mainLayout = this.#mainLayout
         const menuLayout = this.#menuLayout
         const menuStart = this.#menuStart
         const classLoader = this.#classLoader
         let initialX = 0
         let initialY = 0
         let isMove = false
         let isMenuLayout = false
         const MainLayoutOnTouchListener = Java.registerClass({
             name: "com.example.MainLayoutEvent",
             implements: [classLoader.View_OnTouchListener],
             methods: {
                 onTouch(view, event) {
                     switch(event.getAction()) {
                         case classLoader.MotionEvent.ACTION_DOWN.value:
                             initialX = view.getX() - event.getRawX();
                             initialY = view.getY() - event.getRawY();
                             isMove = false
                             break
                         case classLoader.MotionEvent.ACTION_UP.value:
                             if(!isMove) {
                                 if(!isMenuLayout) {
                                     mainLayout.removeView(menuStart)
                                     mainLayout.addView(menuLayout)
                                     isMenuLayout = true
                                 } else {
                                     mainLayout.removeView(menuLayout)
                                     mainLayout.addView(menuStart)
                                     isMenuLayout = false
                                 }
                             }
                             break
                         case classLoader.MotionEvent.ACTION_MOVE.value:
                             view.setX(event.getRawX() + initialX)
                             view.setY(event.getRawY() + initialY)
                             isMove = true
                             break
                         default:
                             return false
                     }
                     return true
                 }
             }
         })
         this.#mainLayout.setOnTouchListener(MainLayoutOnTouchListener.$new())
     }
     
     start() {
         this.#drawContentView()
         this.#drawMainLayout()
         this.#drawMenuStart()
         this.#drawMenuBarLayout()
         this.#drawMenuBarTitle()
         this.#drawMenuOptions()
         this.#createMainLayoutEvent()
     }
     
}

function readArrayByIndex(instance, index) {
    let startArrayIndexAddress = instance.add(0x10)
    return startArrayIndexAddress.add(index * 4).readPointer()
}

var option = []
option[0] = {state: false}
option[1] = {state: false}
option[2] = {state: false}
function hookPlayerUpdate(module) {
    const playerUpdate = module.base.add(0x584828)
    Interceptor.attach(playerUpdate, {
            onEnter(args) {
                let currentWeapon = args[0].add(0x18).readInt()
                let weaponsArrayInstance= args[0].add(0x14).readPointer()
                let weaponsInstance= readArrayByIndex(weaponsArrayInstance, currentWeapon)
                let weaponInstance = weaponsInstance.add(0x8).readPointer()
                if(option[0].state) {
                    let playerHealthInstance = args[0].add(0x0c).readPointer()
                    playerHealthInstance.add(0xc).writeFloat(100)
                }
                
                if (option[1].state)
                    weaponInstance.add(0x68).writeInt(3)
                
                
                if(option[2].state) {
                    weaponInstance.add(0x5C).writeFloat(0)
                } else weaponInstance.add(0x5C).writeFloat(0.5)
            }
    })
}

function createHooks() {
    const module = Process.getModuleByName("libil2cpp.so")
    hookPlayerUpdate(module)
}

const option1 = {
    on() {
        option[0].state = true
    },
    off() {
        option[0].state = false
    }
}

const option2 = {
    on() {
        option[1].state = true
    },
    off() {
        option[1].state = false
    }
}

const option3 = {
    on() {
        option[2].state = true
    },
    off() {
        option[2].state = false
    }
}

Java.perform(function() {
    Java.scheduleOnMainThread(function() {
        const mainActivity = getMainActivity(classLoader)
        const menu = new Menu(classLoader, mainActivity)
        menu.createMenuStart("Zunz", "#006400")
        menu.createMenuLayout("#18122B", 900)
        menu.createMenuBarLayout("#635985")
        menu.createMenuBarTitle("EngModMobile", "#FFC107")
        menu.createMenuOptionsLayout("#443C68", "#393053")
        createHooks()
        menu.addOption("option1", "Health", option1)
        menu.addOption("option2", "Ammo", option2)
        menu.addOption("option3", "Fire rate", option3)
        menu.start()
    })
})
