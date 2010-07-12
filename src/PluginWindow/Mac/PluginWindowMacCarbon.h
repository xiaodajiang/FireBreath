/**********************************************************\
 Original Author: Anson MacKeracher 
 
 Created:    Jul 12, 2010
 License:    Dual license model; choose one of two:
 Eclipse Public License - Version 1.0
 http://www.eclipse.org/legal/epl-v10.html
 - or -
 GNU Lesser General Public License, version 2.1
 http://www.gnu.org/licenses/lgpl-2.1.html
 
 Copyright 2010 Anson MacKeracher, Firebreath development team
 \**********************************************************/

#ifndef H_PLUGINWINDOWMAC_CARBON
#define H_PLUGINWINDOWMAC_CARBON

#include "PluginWindow.h"
#include <map>
#include "PluginEvents/MacEventCarbon.h"
#include <ApplicationServices/ApplicationServices.h>

namespace FB {
    
    class PluginWindowMacCarbon : public PluginWindow
    {
    public:
        PluginWindowMacCarbon();
        virtual ~PluginWindowMacCarbon();
        
        virtual int16_t HandleEvent(EventRecord* evt) { return 0; };
        virtual void clearWindow();

        // Accessors 
        Rect getWindowPosition();
        Rect getWindowClipping();
        int getWindowHeight();
        int getWindowWidth();

        void setWindow(PluginWindow win);
        void setWindowPosition(int32_t x, int32_t y, uint32_t width, uint32_t height);
        void setWindowClipping(uint16_t top, uint16_t left, uint16_t bottom, uint16_t right);

    protected:
        int m_x;
        int m_y;
        int m_width;
        int m_height;
        
        int m_clipLeft;
        int m_clipRight;
        int m_clipTop;
        int m_clipBottom;

        int m_old_x, m_old_y; // Keep track of mouse movement coordinates
    };
};

#endif // H_PLUGINWINDOWMAC_CARBON
