import {CATEGORY_TEMPLATES, CategoryKey} from './category-templates'

function pickOne<T extends readonly unknown[]>(items: T): T[number] {
    return items[Math.floor(Math.random() * items.length)]
}

function pickTwoDistinct<T>(items: T[]): [T, T] {
    const first = Math.floor(Math.random() * items.length)
    let second = Math.floor(Math.random() * items.length)
    while (second === first) second = Math.floor(Math.random() * items.length)
    return [items[first], items[second]]
}

function pickExtras<T>(items: readonly T[]): T[] {
    const shuffled = [...items].sort(() => Math.random() - 0.5)
    const count = Math.random() < 0.5 ? 1 : 2
    return shuffled.slice(0, count)
}

async function sha256(input: string) {
    const msgUint8 = new TextEncoder().encode(input)
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

export async function buildUniqueCandidate(category: CategoryKey) {
    const template = CATEGORY_TEMPLATES[category]

    if (!template) {
        throw new Error(`Template not found for category: ${category}`)
    }

    const allCharacters = Object.values(template.groupedCharacters).flat()
    const [person1, person2] = pickTwoDistinct([...allCharacters])
    const extras = pickExtras(template.extras)

    const themeSubtextPair = pickOne(template.themeSubtextPairs)
    const theme = themeSubtextPair[0]
    const subtext = themeSubtextPair[1]
    const payload = {
        category,
        templateName: template.templateName,
        theme,
        subtext,
        person1,
        person2,
        layout: pickOne(template.layoutRandomization),
        visualStory: pickOne(template.visualStoryVariation),
        lighting: pickOne(template.lightingRandomization),
        colorStyle: pickOne(template.colorStyleRandomization),
        role1: pickOne(template.leftRoleLabels),
        role2: pickOne(template.rightRoleLabels),
        extras,
    }

    const fingerprintHash = await sha256(JSON.stringify(payload))

    const generatedPrompt = `${template.intro}

CORE RANDOMIZATION ENGINE:
- Randomly selected TWO DISTINCT figures from the provided list
- Selected figure 1: ${payload.person1}
- Selected figure 2: ${payload.person2}
- Assigned positions: PERSON 1 = LEFT/TOP, PERSON 2 = RIGHT/BOTTOM

LAYOUT RANDOMIZATION (chosen):
- ${payload.layout}

THEME RANDOMIZATION (chosen):
- "${payload.theme}"

VISUAL STORY VARIATION (chosen):
- ${payload.visualStory}

LIGHTING RANDOMIZATION (chosen):
- ${payload.lighting}

COLOR STYLE RANDOMIZATION (chosen):
- ${payload.colorStyle}

TEXT SYSTEM:
- Main header: "${payload.theme}"
- Subtext: "${payload.subtext}"
- Name labels: "${payload.person1}" and "${payload.person2}"
- Left/Top role label: "${payload.role1}"
- Right/Bottom role label: "${payload.role2}"

REACTION ELEMENTS (ALWAYS INCLUDED):
- Large 👍 blue button (25–30% width)
- Large ❤️ red button (25–30% width)
- Positioned dynamically depending on layout (bottom or center overlay)

EXTRA CREATIVE ELEMENTS:
${payload.extras.map((x) => `- ${x}`).join('\n')}

STRICT RULES:
${template.strictRules.map((x) => `- ${x}`).join('\n')}

GOAL:
${template.goal}`

    return {
        template,
        payload,
        fingerprintHash,
        generatedPrompt,
        allCharacters,
    }
}