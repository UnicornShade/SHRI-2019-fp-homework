import { prop, cond, compose, equals, tap, assoc, invoker } from 'ramda'

import { SHAPES } from '../constants'

// Использовать для округления результата
const round = num => Math.round(num * 10) / 10

/**
 * Функции возвращающие св-ва объекта эквивалент
 *
 * const propShape = obj => obj.shape
 **/
const propShape = prop('shape')
const propHeight = prop('height')
const propDensity = prop('density')
const propSize = prop('size')

const roundDec = invoker(1, 'toFixed')(1)


/**
 * Промежуточные формулы для рассчета указанные в задании
 */
const G = 9.8

const momentumFormula = ({ mass, velocity }) => mass * velocity

const velocityFormula = height => Math.sqrt(2 * G * height)

const massFormula = ({ volume, density }) => volume * density

const cubeVolumeFormula = n => Math.pow(n, 3)

const sphereVolumeFormula = d => (Math.PI * Math.pow(d, 3)) / 6

const tetrahedronVolumeFormula = r => (Math.pow(r, 3) * Math.sqrt(2)) / 12


const shapeEqualsCube = compose(
  equals(SHAPES.CUBE),
  propShape
)

const shapeEqualsSphere = compose(
  equals(SHAPES.SPHERE),
  propShape
)

const shapeEqualsTetrahedron = compose(
  equals(SHAPES.TETRAHEDRON),
  propShape
)

const calcCubeVolume = compose(
  cubeVolumeFormula,
  propSize
)

const calcSphereVolume = compose(
  sphereVolumeFormula,
  propSize
)

const calcTetrahedronVolume = compose(
  tetrahedronVolumeFormula,
  propSize
)

const calcVolume = cond([
  [shapeEqualsCube, calcCubeVolume],
  [shapeEqualsSphere, calcSphereVolume],
  [shapeEqualsTetrahedron, calcTetrahedronVolume]
])

const assocVolume = obj => assoc('volume', calcVolume(obj), obj)

const calcMass = obj => assoc('mass', massFormula(obj), obj)

const calcVelocity = obj => assoc('velocity', velocityFormula(propHeight(obj)), obj)

const log = tap((v) => console.log(v))

const computeMomentum = compose(
  roundDec,
  momentumFormula,
  log,
  calcVelocity,
  log,
  calcMass,
  log,
  assocVolume
)

export default computeMomentum
