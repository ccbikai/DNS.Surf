import { AspectRatio } from '@/components/ui/aspect-ratio'
import { REGIONS } from '@/config'
import { VisSingleContainer, VisTopoJSONMap, VisTopoJSONMapSelectors } from '@unovis/react'
import { Tooltip } from '@unovis/ts'
import { WorldMapTopoJSON } from '@unovis/ts/maps'
import { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { DNSTooltip } from './dns-tooltip.jsx'

const areas = Object.entries(REGIONS).map(([id, regionConfig]) => {
  return {
    id: regionConfig.provider === 'cloudflare' ? id.replace(/\d/g, '').toUpperCase() : regionConfig.countryCode,
    region: id,
    config: regionConfig,
  }
})

export function DNSMap({ formData }) {
  let currentOrigin = null

  const tooltip = new Tooltip({
    container: document.body,
    attributes: {
      style: 'pointer-events: auto',
    },
  })
  const tooltipDom = document.createElement('div')
  const tooltipRoot = createRoot(tooltipDom)

  const refreshTooltip = (event, data) => {
    if (!currentOrigin) {
      tooltip?.hide()
      return
    }
    tooltipRoot.render(
      <DNSTooltip
        key={currentOrigin.region}
        region={currentOrigin.region}
        config={currentOrigin.config}
        regionId={data?.id}
        formData={formData}
      />,
    )
    tooltip?.show(tooltipDom || null, event)
  }

  const events = {
    [VisTopoJSONMapSelectors.feature]: {
      click({ data = {} }, event) {
        if (!data.id) {
          return tooltip?.hide()
        }

        if (currentOrigin?.id === data.id) {
          console.info('same area', data)
          return refreshTooltip(event, data)
        }

        console.info('change area', data)
        currentOrigin = data
        refreshTooltip(event, data)
      },
    },
    [VisTopoJSONMapSelectors.background]: {
      click() {
        return tooltip?.hide()
      },
    },
  }

  useEffect(() => {
    currentOrigin = null
    refreshTooltip()
    return () => {
      tooltip?.hide()
    }
  }, [formData])

  return (
    <AspectRatio ratio={65 / 30}>
      <VisSingleContainer key={formData.time} data={{ areas }} className="h-full">
        <VisTopoJSONMap topojson={WorldMapTopoJSON} events={events} />
      </VisSingleContainer>
    </AspectRatio>
  )
}
